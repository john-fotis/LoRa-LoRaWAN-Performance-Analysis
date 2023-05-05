# [Performance analysis of LoRa and LoRaWAN communications](https://github.com/john-fotis/LoRa-LoRaWAN-Performance-Analysis/blob/master/Thesis.pdf)

## Thesis Abstract
In a rapidly developing technological world, where many devices need to be connected to the network to offer multiple services to the end user, the need for high connectivity and low power consumption is vital. Internet of Things (IoT), as well as the user’s will to be always online and interact with the physical and the virtual world, are the crucial factors that create this necessity. The technological and practical requirements are many and imperative, given that a very large amount of data has to be exchanged wirelessly fast while keeping the communication secure.

Low Power Wide Area Networks (LPWANs) is an emerging networking paradigm in the area of IoT communications. Its main purpose is to enable sensor-like devices to successfully send data to a receiver in a periodic-based or event-driven scheme, by using as little power as possible to reach the distant concentrator. These goals are achievable, among others, with the use of LoRa and LoRaWAN technologies. LoRa modulation technique is applied on messages that follow the LoRaWAN protocol and promises wide coverage, low energy consumption and highly reliable data transmission. This technology stack has contributed to the realization of many IoT applications, spanning in a plethora of use cases, like energy management, protection from natural disasters, environmental pollution check, and hazardous event detection.

This thesis is focused on evaluating the LoRa modulation technique, which resides in the Physical layer (PHY), as well as the Medium Access Control layer (MAC) protocol LoRaWAN, that sits on top of LoRa. Initially, we lay the theoretical background on the two technologies. With the theoretical background established, we continue to the definition and implementation of two experimental scenarios, in order to highlight the real capabilities of this networking stack. Specifically, we execute a series of measurements with commercial off-the-shelf LoRaWAN equipment, in an effort to comprehend the relationship between some parameters of LoRa links (e.g., SF) with some common network performance metrics (e.g., RSSI).  Afterwards, we process the results of these experiments and we present the outcome in a tangible and understandable way, using a custom-made web application.

## Thesis Results - Web Application
* The Web application where you can see the final results of our experiments is available [here](https://john-fotis.github.io/LoRa-LoRaWAN-Performance-Analysis/).
* Alternatively, you can build the app locally by installing [Docker](https://www.docker.com/products/docker-desktop/) and running `docker compose up -d` in a bash shell at the root of this repo.<br/>
Then, you can visit http://localhost:9000 to see the application.

## Web Application Data Generation
For more information on how we generated and processed the data, as well as instructions on how to do it yourself, you can consult this [README](https://github.com/john-fotis/LoRa-LoRaWAN-Performance-Analysis/blob/master/DataGeneration/README.md) file.

## Official publication
[Pergamos/Performance-analysis-of-LoRa-and-LoRaWAN-communications](https://pergamos.lib.uoa.gr/uoa/dl/frontend/el/browse/3221431)

## Contributors
- [John Fotis](https://github.com/john-fotis)
- [Katerina Giannopoulou](https://github.com/katerinagiann)
