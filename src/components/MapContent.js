import React, { useState } from "react";
import { useMap, Marker, TileLayer, LayersControl, LayerGroup, Circle, Tooltip } from "react-leaflet";
import s1 from '../assets/metrics/scenario1.js';
import s2 from "../assets/metrics/scenario2.js";
import selectIcon, { gatewayIcon } from "./MarkerIcon.js";
import { circleTooltip, maxRangeTooltip } from "./TooltipContent.js";
import OSM from "../config/OSM.js";

export default function MapContent(props) {
    const [scenario, setScenario] = useState(true);
    const [sc1Sf7, setSc1Sf7] = useState([]);
    const [sc1Sf8, setSc1Sf8] = useState([]);
    const [sc1Sf9, setSc1Sf9] = useState([]);
    const [sc2Sf7, setSc2Sf7] = useState([]);
    const [sc2Sf8, setSc2Sf8] = useState([]);
    const [sc2Sf9, setSc2Sf9] = useState([]);
    const [sc2Sf10, setSc2Sf10] = useState([]);
    const mapRef = useMap();

    // sc1 = [sc1Sf7Data[], sf8Data[], sf9Data[]]
    var sc1 = [[], [], []];
    // sc2 = [sc1Sf7Data[], sf8Data[], sf9Data[], sf10Data[]]
    var sc2 = [[], [], [], []];

    const applyScenario1 = () => {
        // Import SF 7-9 data
        for (var sf = 0; sf < s1[0].circleData.length; sf++)
            if (!sc1[sf].length)
            for (var circle = 0; circle < s1.length; circle++)
                for (var point = 0; point < s1[circle].circleData[sf].sfData.length; point++)
                sc1[sf].push(s1[circle].circleData[sf].sfData[point]);
        setSc1Sf7(sc1[0]);
        setSc1Sf8(sc1[1]);
        setSc1Sf9(sc1[2]);
        setScenario(true);
        mapRef.setView(props.center, props.zoom1)
    };

    const applyScenario2 = () => {
        // Import SF 7-10 data
        for (var sf = 0; sf < s2[0].areaData.length; sf++)
            if (!sc2[sf].length)
            for (var area = 0; area < s2.length; area++)
                for (var point = 0; point < s2[area].areaData[sf].sfData.length; point++)
                sc2[sf].push(s2[area].areaData[sf].sfData[point]);
        setSc2Sf7(sc2[0]);
        setSc2Sf8(sc2[1]);
        setSc2Sf9(sc2[2]);
        setSc2Sf10(sc2[3]);
        setScenario(false);
        mapRef.setView(props.center, props.zoom2)
    };

    return (
        <LayersControl position = "topright">
            <Marker position = {props.center} icon = {gatewayIcon}>
                <Tooltip direction = "top" opacity = {1} >Gateway</Tooltip>
            </Marker>
            {/* Scenario 1 */}
            <LayersControl.BaseLayer name = "Scenario 1" checked>
            <TileLayer
                url = {OSM.tiler.url}
                attribution = {OSM.tiler.attribution}
                {...OSM.tiler.interaction}
                eventHandlers = {{ add: () => { applyScenario1(); } }}
            />
            {/* Scenario 2 */}
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name = "Scenario 2">
            <TileLayer
                url = {OSM.tiler.url}
                attribution = {OSM.tiler.attribution}
                {...OSM.tiler.interaction}
                eventHandlers = {{ add: () => { applyScenario2(); } }}
            />
            </LayersControl.BaseLayer>
            {/* Data & elements to be displayed per scenario */}
            {scenario && (
            <LayerGroup>
                <Circle
                center = {props.center}
                radius = {100}
                weight = {1}
                color = {"red"}
                fillOpacity = {0}
                />
                <Circle
                center = {props.center}
                radius = {150}
                weight = {1}
                color = {"yellow"}
                fillOpacity = {0}
                />
                <Circle
                center = {props.center}
                radius = {200}
                weight = {1}
                color = {"green"}
                fillOpacity = {0}
                />
            </LayerGroup>
            )}
            <LayersControl.Overlay name = "SF 7" checked>
            <LayerGroup>
                {/* SF 7 measurements */}
                {scenario && sc1Sf7.length && sc1Sf7.map((point, k) => (
                <Marker
                    key = {k}
                    position = {[point.Latitude, point.Longitude]}
                    icon = {selectIcon(point.AverageRSSI)}
                >
                    {circleTooltip(7, point)}
                </Marker>
                ))}
                {!scenario && sc2Sf7.length && sc2Sf7.map((point, k) => (
                <Marker
                    key = {k}
                    position = {[point.Latitude, point.Longitude]}
                    icon = {selectIcon(point.RSSI)}
                >
                    {maxRangeTooltip(7, point)}
                </Marker>
                ))}
            </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name = "SF 8">
            <LayerGroup>
                {/* SF 8 measurements */}
                {scenario && sc1Sf8.length && sc1Sf8.map((point, k) => (
                <Marker
                    key = {k}
                    position = {[point.Latitude, point.Longitude]}
                    icon = {selectIcon(point.AverageRSSI)}
                >
                    {circleTooltip(8, point)}
                </Marker>
                ))}
                {!scenario && sc2Sf8.length && sc2Sf8.map((point, k) => (
                <Marker
                    key = {k}
                    position = {[point.Latitude, point.Longitude]}
                    icon = {selectIcon(point.RSSI)}
                >
                    {maxRangeTooltip(8, point)}
                </Marker>
                ))}
            </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name = "SF 9">
            <LayerGroup>
                {/* SF 9 measurements */}
                {scenario && sc1Sf9.length && sc1Sf9.map((point, k) => (
                <Marker
                    key = {k}
                    position = {[point.Latitude, point.Longitude]}
                    icon = {selectIcon(point.AverageRSSI)}
                >
                    {circleTooltip(9, point)}
                </Marker>
                ))}
                {!scenario && sc2Sf9.length && sc2Sf9.map((point, k) => (
                <Marker
                    key = {k}
                    position = {[point.Latitude, point.Longitude]}
                    icon = {selectIcon(point.RSSI)}
                >
                    {maxRangeTooltip(9, point)}
                </Marker>
                ))}
            </LayerGroup>
            </LayersControl.Overlay>
            {!scenario && (
            <LayersControl.Overlay name = "SF 10">
                <LayerGroup>
                {/* SF 10 measurements */}
                {!scenario && sc2Sf10.length && sc2Sf10.map((point, k) => (
                    <Marker
                        key = {k}
                        position = {[point.Latitude, point.Longitude]}
                        icon = {selectIcon(point.RSSI)}
                    >
                        {maxRangeTooltip(10, point)}
                    </Marker>
                    ))}
                </LayerGroup>
            </LayersControl.Overlay>
            )}
        </LayersControl>
    );
}