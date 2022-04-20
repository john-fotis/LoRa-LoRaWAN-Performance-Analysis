import json
import os.path
import sys
from csv import DictReader
from itertools import groupby

level1Name = ''

def main():

    # Argument validation
    if len(sys.argv) != 2:
        print("Type: python ./script.py $inFile")
        sys.exit(0)
    inFile = sys.argv[1]
    # Checking if directory exists
    if (os.path.exists(inFile) == False):
        print("File does not exist")
        sys.exit(0)
    outFile = inFile[:-4] + '.json'
    # Read the csv file
    with open(inFile) as csvFile:
        r = DictReader(csvFile, skipinitialspace = True)
        level1Data = [dict(d) for d in r]
    # Check which scenario data we are about to process
    global level1Name
    if list(level1Data[0].keys())[0] == 'Circle':
        level1Name = 'Circle'
        level1Content = 'circleData'
    else:
        level1Name = 'Area'
        level1Content = 'areaData'

    level2Name = 'SF'
    level2Content = 'sfData'

    level1Objects = []
    for k1, g1 in groupby(level1Data, getLevel1Key):

        level2Data = [{key: float(value) for key, value in d.items() if key != level1Name} for d in list(g1)]
        level2Objects = []
        for k2, g2 in groupby(level2Data, getLevel2Key):
            level2Objects.append (
                {
                    level2Name: int(k2),
                    level2Content: [{key: float(value) for key, value in d.items() if key != level2Name} for d in list(g2)]
                }
            )

        level1Objects.append (
            {
                level1Name: k1,
                level1Content: level2Objects
            }
        )
    # Store the final data in $outFile
    with open(outFile, 'w') as f:
        json.dump(level1Objects, f, indent = 4)
    return


def getLevel1Key(x):
    global level1Name
    return x[level1Name]


def getLevel2Key(x):
    return x['SF']


if __name__ == "__main__":
    main()