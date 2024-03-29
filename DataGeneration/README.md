﻿# The generation of the JSON data for the map is produced in 2 steps for each scenario. The output files should then be placed in ***`~/src/assets/metrics`*** in order to be utilized by the map API.

## Prerequisites:
  - [Python 3](https://www.python.org/)
  - pip (Included by default after Python 3.4 version)
  - install pandas package via pip (pip install pandas)
  - install geopy package via pip (pip install geopy)

## Scenario 1 - Observe Signal behavior among different equidistant points from the Gateway:

### Step 1: ***Produce scenario1.csv***
```
python ./circle.py ./scenario1/
```

### Step 2: ***Produce scenario1.json***
```
python ./csvToJson.py ./scenario1.csv
```

## Scenario 2 - Realize the max coverage distance from the Gateway:

### Step 2: ***Produces scenario2.csv***
```
python ./maxRange.py ./scenario2/
```

### Step 2: ***Produce scenario2.json***
```
python ./csvToJson.py ./scenario2.csv
```

## Note that the folder you are working in ***must*** have the following structure tree:

```
DataGeneration:.
|   circle.py
|   csvToJson.py
|   maxRange.py
|   
+---scenario1
|       100m-sf7.csv
|       100m-sf8.csv
|       100m-sf9.csv
|       150m-sf7.csv
|       150m-sf8.csv
|       150m-sf9.csv
|       200m-sf7.csv
|       200m-sf8.csv
|       200m-sf9.csv
|       
\---scenario2
    +---east
    |       sf10.csv
    |       sf7.csv
    |       sf8.csv
    |       sf9.csv
    |       
    +---north
    |       sf10.csv
    |       sf7.csv
    |       sf8.csv
    |       sf9.csv
    |       
    +---south
    |       sf10.csv
    |       sf7.csv
    |       sf8.csv
    |       sf9.csv
    |       
    \---west
            sf10.csv
            sf7.csv
            sf8.csv
            sf9.csv
```
