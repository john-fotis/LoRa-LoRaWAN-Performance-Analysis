import React, { useEffect, useState } from "react";
import { useMap, FeatureGroup, Marker, Popup, TileLayer, LayersControl, LayerGroup, Circle } from "react-leaflet";
import OSM from "../config/OSM";
import API from "../services/API"
import selectIcon from "./MarkerIcon";
import { circleTooltip, maxRangeTooltip } from "./TooltipContent";
import Loading from "./Loading";
import Legend from "./Legend";
import SightMarkers from "./SightMarkers";
import { gatewayIcon } from './MarkerIcon';
import lorixOne from "../assets/images/lorixOne.png"

export default function ScenariosContent (props) {
    const [scenario, setScenario] = useState(true);
    const [sc1Sf7, setSc1Sf7] = useState([]);
    const [sc1Sf8, setSc1Sf8] = useState([]);
    const [sc1Sf9, setSc1Sf9] = useState([]);
    const [sc2Sf7, setSc2Sf7] = useState([]);
    const [sc2Sf8, setSc2Sf8] = useState([]);
    const [sc2Sf9, setSc2Sf9] = useState([]);
    const [sc2Sf10, setSc2Sf10] = useState([]);
    const [loading, setLoading] = useState(true)
    const mapContext = useMap();

    // sc1 = [sc1Sf7Data[], sc1Sf8Data[], sc1Sf9Data[]]
    var sc1 = [[], [], []];
    // sc2 = [sc2Sf7Data[], sc2Sf8Data[], sc2Sf9Data[], sc2Sf10Data[]]
    var sc2 = [[], [], [], []];

    useEffect(() => {
        const fetchData = async () => {
            let api = new API();
            try {
                initializeScenario1Data(await api.GET("scenario1"));
                initializeScenario2Data(await api.GET("scenario2"));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false)
            }
        };
        // Fetch data and load scenario 1 when the component mounts
        fetchData();
        applyScenario1();
    }, [mapContext, props.center, props.zoom1, props.zoom2, props.refresh]);

    const initializeScenario1Data = (response) => {
        response.forEach((radius) => {
            radius.circleData.forEach((sf, index) => {
                sf.sfData.forEach((measurement) => {
                    sc1[index].push(measurement);
                });
            });
        });
        setSc1Sf7(sc1[0]);
        setSc1Sf8(sc1[1]);
        setSc1Sf9(sc1[2]);
    };

    const initializeScenario2Data = (response) => {
        response.forEach((area) => {
            area.areaData.forEach((sf, index) => {
                sf.sfData.forEach((measurement) => {
                    sc2[index].push(measurement);
                });
            });
        });
        setSc2Sf7(sc2[0]);
        setSc2Sf8(sc2[1]);
        setSc2Sf9(sc2[2]);
        setSc2Sf10(sc2[3]);
    };

    const applyScenario1 = () => {
        setScenario(true);
        mapContext.setView(props.center, props.zoom1)
    };

    const applyScenario2 = () => {
        setScenario(false);
        mapContext.setView(props.center, props.zoom2)
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <FeatureGroup>
                    <Marker position={props.center} icon={gatewayIcon}>
                        <Popup direction='top' opacity={1}><img src={lorixOne} alt='Gateway' width='200' height='200' /></Popup>
                    </Marker>
                    <SightMarkers gatewayCoords={props.center} />
                    <Legend map={mapContext} />
                    <LayersControl position="topright">
                        {/* Scenario 1 */}
                        <LayersControl.BaseLayer name="Scenario 1" checked>
                            <TileLayer
                                url={OSM.tiler.url}
                                attribution={OSM.tiler.attribution}
                                {...OSM.tiler.interaction}
                                eventHandlers={{ add: () => { applyScenario1(); } }}
                            />
                            {/* Scenario 2 */}
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Scenario 2">
                            <TileLayer
                                url={OSM.tiler.url}
                                attribution={OSM.tiler.attribution}
                                {...OSM.tiler.interaction}
                                eventHandlers={{ add: () => { applyScenario2(); } }}
                            />
                        </LayersControl.BaseLayer>
                        {/* Data & elements to be displayed per scenario */}
                        {scenario && (
                            <LayerGroup>
                                <Circle
                                    center={props.center}
                                    radius={100}
                                    weight={1}
                                    color={"red"}
                                    fillOpacity={0}
                                />
                                <Circle
                                    center={props.center}
                                    radius={150}
                                    weight={1}
                                    color={"yellow"}
                                    fillOpacity={0}
                                />
                                <Circle
                                    center={props.center}
                                    radius={200}
                                    weight={1}
                                    color={"green"}
                                    fillOpacity={0}
                                />
                            </LayerGroup>
                        )}
                        <LayersControl.Overlay name="SF 7" checked>
                            <LayerGroup>
                                {/* SF 7 measurements */}
                                {scenario && sc1Sf7.length && sc1Sf7.map((point, k) => (
                                    <Marker
                                        key={k}
                                        position={[point.Latitude, point.Longitude]}
                                        icon={selectIcon(point.AverageRssi)}
                                    >
                                        {circleTooltip(7, point)}
                                    </Marker>
                                ))}
                                {!scenario && sc2Sf7.length && sc2Sf7.map((point, k) => (
                                    <Marker
                                        key={k}
                                        position={[point.Latitude, point.Longitude]}
                                        icon={selectIcon(point.Rssi)}
                                    >
                                        {maxRangeTooltip(7, point)}
                                    </Marker>
                                ))}
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay name="SF 8">
                            <LayerGroup>
                                {/* SF 8 measurements */}
                                {scenario && sc1Sf8.length && sc1Sf8.map((point, k) => (
                                    <Marker
                                        key={k}
                                        position={[point.Latitude, point.Longitude]}
                                        icon={selectIcon(point.AverageRssi)}
                                    >
                                        {circleTooltip(8, point)}
                                    </Marker>
                                ))}
                                {!scenario && sc2Sf8.length && sc2Sf8.map((point, k) => (
                                    <Marker
                                        key={k}
                                        position={[point.Latitude, point.Longitude]}
                                        icon={selectIcon(point.Rssi)}
                                    >
                                        {maxRangeTooltip(8, point)}
                                    </Marker>
                                ))}
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay name="SF 9">
                            <LayerGroup>
                                {/* SF 9 measurements */}
                                {scenario && sc1Sf9.length && sc1Sf9.map((point, k) => (
                                    <Marker
                                        key={k}
                                        position={[point.Latitude, point.Longitude]}
                                        icon={selectIcon(point.AverageRssi)}
                                    >
                                        {circleTooltip(9, point)}
                                    </Marker>
                                ))}
                                {!scenario && sc2Sf9.length && sc2Sf9.map((point, k) => (
                                    <Marker
                                        key={k}
                                        position={[point.Latitude, point.Longitude]}
                                        icon={selectIcon(point.Rssi)}
                                    >
                                        {maxRangeTooltip(9, point)}
                                    </Marker>
                                ))}
                            </LayerGroup>
                        </LayersControl.Overlay>
                        {!scenario && (
                            <LayersControl.Overlay name="SF 10">
                                <LayerGroup>
                                    {/* SF 10 measurements */}
                                    {!scenario && sc2Sf10.length && sc2Sf10.map((point, k) => (
                                        <Marker
                                            key={k}
                                            position={[point.Latitude, point.Longitude]}
                                            icon={selectIcon(point.Rssi)}
                                        >
                                            {maxRangeTooltip(10, point)}
                                        </Marker>
                                    ))}
                                </LayerGroup>
                            </LayersControl.Overlay>
                        )}
                    </LayersControl>
                </FeatureGroup>

            )}
        </>
    );
}