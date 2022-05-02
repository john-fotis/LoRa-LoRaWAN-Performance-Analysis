import csv
import math
import os.path
import statistics
import sys
from datetime import datetime

import geopy.distance as geo
import pandas as pd

gatewayCoords = (37.968357764526694, 23.76709967851639)

# This script takes as input an $dirPath with one or more CSV files with metrics.
# All data is imported and analyzed to export statistics about RSSI, SNR and PDR
# values. Additionally, metrics that were taken at the same geographical point
# are grouped in in order to observe the average behavior of the signal on each site.

def main():

    # Argument validation
    if len(sys.argv) != 2:
        print("Type: python ./circle.py $dirPath")
        sys.exit(0)
    dirPath = sys.argv[1]
    # Checking if directory exists
    if (os.path.exists(dirPath) == False):
        print("Path not found")
        sys.exit(0)
    # Variables
    standardOffset = 0.00015
    pointsVisited, localMeasurements, currentLat, currentLon, validMeasurements, invalidMeasurements, tempLat, tempLon = 1, 0, 0, 0, 0, 0, 0, 0
    pathLevels, point, pointList, data, localRssi, localSnr, localAccuracy = [], [], [], [], [], [], []
    desiredValues = ["GatewayId", "GatewayTime", "SpreadingFactor", "Rssi", "Snr", "Latitude", "Longitude", "AccuracyMeters", "AccuracySource"]
    point = ['Radius', 'SF', 'MaxRssi', 'MinRssi', 'AverageRssi', 'MedianRssi', 'MaxSnr', 'MinSnr', 'AverageSnr', 'MedianSnr', 'AverageAccuracy', 'PDR', 'Latitude', 'Longitude', 'Measurements']
    pointList = [point.copy()]
    folder = './'
    # Adjust given folder path format if necessary
    if dirPath.endswith('\\'): pathLevels = dirPath.split('\\')
    else: pathLevels = dirPath.split('/')
    # Rebuild the folder path using '/' deliminator
    for level in range(1, len(pathLevels)-1): folder += str(pathLevels[level]) + '/'
    # List all files to process in the folder
    files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f)) and str(f).endswith('.csv')]
    outFile = pathLevels[1] + '.csv'

    for file in files:
        radius = file[:3]
        sf = file[-5]
        df = pd.read_csv(folder + file, usecols=desiredValues).T.to_dict()

        for d in df:
            if df[d]["GatewayId"] == "fogus-gw-1" and getDistance(df[d]["Latitude"], df[d]["Longitude"]) > 20:
                # Increase the offset threshold in case of network assisted record due to lack of accuracy
                if df[d]["AccuracySource"] == "network": maxOffset = 100 * standardOffset
                else: maxOffset = standardOffset

                if (df[d]["AccuracySource"] == "gps" and (abs(df[d]["Latitude"] - currentLat) > maxOffset or abs(df[d]["Longitude"] - currentLon) > maxOffset) and localMeasurements > 5) or (df[d]["AccuracySource"] == "network" and localMeasurements > 9):
                    if (validMeasurements):
                        addPoint(point, pointList, radius, sf, localRssi, localSnr, localAccuracy, localMeasurements, invalidMeasurements, currentLat, currentLon)
                    localRssi.clear()
                    localSnr.clear()
                    localAccuracy.clear()
                    localMeasurements = invalidMeasurements = 0
                    pointsVisited += 1

                # Update current coordinates only if they are accurate
                if df[d]["AccuracySource"] == "gps":
                    currentLat = df[d]["Latitude"]
                    currentLon = df[d]["Longitude"]

                # Insert the data
                if not math.isnan(df[d]["Rssi"]): localRssi.append(df[d]["Rssi"])
                if not math.isnan(df[d]["Snr"]): localSnr.append(df[d]["Snr"])
                if not math.isnan(df[d]["AccuracyMeters"]): localAccuracy.append(df[d]["AccuracyMeters"])
                if not math.isnan(df[d]["AccuracyMeters"]) or not math.isnan(df[d]["Snr"]) or not math.isnan(df[d]["Rssi"]):
                    localMeasurements += 1
                    validMeasurements += 1
            else:
                # Handle invalid record
                if not localMeasurements:
                    tempLat = df[d]["Latitude"]
                    tempLon = df[d]["Longitude"]
                    if lostPacket(df, d): invalidMeasurements += 1
                else:
                    if abs(tempLat - currentLat) > maxOffset or abs(tempLon - currentLat) and localMeasurements > 5:
                        if lostPacket(df, d): invalidMeasurements += 1
                    else: invalidMeasurements = 0

        # Store the last point stats and clear local file data to prepare for next file
        addPoint(point, pointList, radius, sf, localRssi, localSnr, localAccuracy, localMeasurements, invalidMeasurements, currentLat, currentLon)
        print(f'Radius = {radius}m, SF = {sf}, Valid measurements = {validMeasurements}, Points = {pointsVisited}')
        validMeasurements = pointsVisited = 0
        for point in pointList: data.append(point.copy())
        pointList.clear()

    # Store the final data into the $outFile
    with open(outFile, 'w') as f:
        write = csv.writer(f)
        write.writerows(data)
    print(f'Output stored in {outFile}')

    return

def addPoint(point, pointList, radius, sf, localRssi, localSnr, localAccuracy, localMeasurements, invalidMeasurements, currentLat, currentLon):
    point.clear()
    point.append(radius)
    point.append(sf)
    point.append(max(localRssi))
    point.append(min(localRssi))
    point.append(round(weightedAverage(localRssi, localAccuracy), 3))
    point.append(statistics.median(localRssi))
    point.append(max(localSnr))
    point.append(min(localSnr))        
    point.append(round(weightedAverage(localSnr, localAccuracy), 3))
    point.append(statistics.median(localSnr))
    point.append(round(float(sum(localAccuracy) / len(localAccuracy)), 3))
    point.append(round((localMeasurements / (localMeasurements + invalidMeasurements)) * 100, 1))
    point.append(currentLat)
    point.append(currentLon)
    point.append(localMeasurements)
    pointList.append(point.copy())

def weightedAverage(list, weightList):
    average = 0
    for i in range(0, len(list)):
        if weightList[i] <= 4:
            average += list[i] * 1.00
        elif weightList[i] <= 8:
            average += list[i] * 0.95
        elif weightList[i] <= 12:
            average += list[i] * 0.90
        else:
            average += list[i] * 0.80
    average /= len(list)
    return average

# Returns seconds between 2 timestamps
def timeDiff(time1, time2):
    return abs((datetime.fromtimestamp(time1/1000000000))-(datetime.fromtimestamp(time2/1000000000))).total_seconds()

# Determines wether a specific record packet is considered lost (for PDR calculation)
def lostPacket(dictionary, item):
    return dictionary[item]["GatewayId"] == "ote-ttn-gr" and timeDiff(dictionary[item]["GatewayTime"], dictionary[item-1]["GatewayTime"]) > 1 and timeDiff(dictionary[item]["GatewayTime"], dictionary[item+1]["GatewayTime"]) > 1

# Returns distance from Gateway in meters
def getDistance(lat, lon):
    return geo.distance(gatewayCoords, (lat, lon)).m

if __name__ == "__main__":
    main()