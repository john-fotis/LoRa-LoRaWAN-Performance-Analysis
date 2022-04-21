import csv
import math
import os.path
import sys

import geopy.distance as geo
import pandas as pd

gatewayCoords = [37.968357764526694, 23.76709967851639]

# The script takes as input a directory that contains one or more csv files with measurements in subfolders.
# It then gets rid of redundant points and sorts them based on their distance from the gateway.
# Finally, the results are grouped by Spreading Factor and stored in $outFile in CSV format.

def main():

    # Argument validation
    if len(sys.argv) != 2:
        print("Type: python ./maxRange.py $dirPath")
        sys.exit(0)
    dirPath = sys.argv[1]
    # Checking if directory exists
    if (os.path.exists(dirPath) == False):
        print("Path not found")
        sys.exit(0)

    # Adjust given folder path format if necessary
    pathLevels, point, pointList, duplicatePoints, sf7, sf8, sf9, sf10, data = [], [], [], [], [], [], [], [], []
    if dirPath.endswith('\\'): pathLevels = dirPath.split('\\')
    else: pathLevels = dirPath.split('/')
    folder = './'
    for level in range(1, len(pathLevels)-1): folder += str(pathLevels[level]) + '/'
    # List all subfolders in the given folder
    subfolders = [f for f in os.listdir(folder)]
    for subfolder in range(0, len(subfolders)):
        subfolders[subfolder] = folder + subfolders[subfolder] + '/'

    # Variables
    desiredValues = ["SpreadingFactor", "GatewayId", "GatewayTime", "Rssi", "Snr", "Latitude", "Longitude", "AccuracyMeters", "AccuracySource"]
    columns = ['Area', 'SF', 'RSSI', 'SNR', 'Latitude', 'Longitude', 'Distance']
    outFile = pathLevels[1] + '.csv'

    for subfolder in subfolders:

        # List all CSV files in the current subfolder
        files = [f for f in os.listdir(subfolder) if os.path.isfile(os.path.join(subfolder, f)) and str(f).endswith('.csv')]
        area = str(subfolder).split('/')[-2]

        # Read and store all files' valid data
        for file in files:
            df = pd.read_csv(subfolder + file, usecols=desiredValues).T.to_dict()
            for d in df:
                if df[d]["GatewayId"] == "fogus-gw-1" and getDistance(gatewayCoords[0], gatewayCoords[1], df[d]["Latitude"], df[d]["Longitude"]) > 200:
                    if not math.isnan(df[d]["Rssi"]):
                        point.append(area)
                        point.append(df[d]['SpreadingFactor'])
                        point.append(df[d]['Rssi'])
                        point.append(df[d]['Snr'])
                        point.append(df[d]['Latitude'])
                        point.append(df[d]['Longitude'])
                        point.append(round(getDistance(gatewayCoords[0], gatewayCoords[1], df[d]['Latitude'], df[d]['Longitude']), 3))
                        pointList.append(point.copy())
                        point.clear()

        # Sort the points based on their distance from the gateway
        pointList = sorted(pointList, key = lambda x: x[-1])
        for p in range(0, len(pointList) - 1):
            point1 = pointList[p]
            point2 = pointList[p + 1]
            # For points of the same SF that are closer than 1 meter to each other, keep the one with the greater distance
            if getDistance(point1[4], point1[5], point2[4], point2[5]) < 1 and point1[1] == point2[1]:
                if getDistance(gatewayCoords[0], gatewayCoords[1], point1[4], point1[5]) == getDistance(gatewayCoords[0], gatewayCoords[1], point1[4], point1[5]):
                    if point1[-1] < point2[-1]: duplicatePoints.append(point1)
                    else: duplicatePoints.append(point2)
                else:
                    # If both points have the same distance from the gateway keep the one with the best RSSI
                    if point1[1] < point2[1]: duplicatePoints.append(point1)
                    else: duplicatePoints.append(point2)
        # Remove all duplicate points
        for p in duplicatePoints:
            if p in pointList: pointList.remove(p)
        # Distribute the data in 4 sets for every SF in {7, 8, 9, 10}
        for p in pointList:
            if p[1] == 7: sf7.append(p)
            if p[1] == 8: sf8.append(p)
            if p[1] == 9: sf9.append(p)
            if p[1] == 10: sf10.append(p)
        # Store all SF data into the final list
        for record in sf7: data.append(record)
        for record in sf8: data.append(record)
        for record in sf9: data.append(record)
        for record in sf10: data.append(record)
        # Reset local data to prepare for next file
        sf7.clear()
        sf8.clear()
        sf9.clear()
        sf10.clear()
        pointList.clear()

    # Store the final data in $outFile
    with open(outFile, 'w') as file:
        write = csv.writer(file)
        write.writerow(columns)
        for record in data:
            write.writerow(record)
    return

# Returns distance from Gateway in meters
def getDistance(lat1, lon1, lat2, lon2):
    return geo.great_circle((lat1, lon1), (lat2, lon2)).m

if __name__ == "__main__":
    main()