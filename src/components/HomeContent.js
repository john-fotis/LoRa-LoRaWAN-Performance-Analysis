import React, { useEffect, useState } from "react";
import { useMap, TileLayer, FeatureGroup, Marker, Popup } from "react-leaflet";
import OSM from "../config/OSM";
import API from "../services/API"
import { gatewayIcon } from './MarkerIcon';
import Loading from "./Loading";
import SightMarkers from "./SightMarkers";

const REFRESH_INTERVAL = process.env.REACT_APP_REFRESH_INTERVAL * 1000 || 60000; // milliseconds

export default function HomeContent (props) {
    const [liveData, setLiveData] = useState([])
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date().toLocaleString());
    const mapContext = useMap();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let api = new API();
            try {
                const data = await api.GET("data");
                setLiveData(data);
                const intervalId = setInterval(async () => {
                    try {
                        const updatedData = await api.GET("data");
                        setLiveData(updatedData);
                        setLastUpdateTime(new Date().toLocaleString());
                    } catch (error) {
                        console.error("Error updating data:", error);
                    }
                }, REFRESH_INTERVAL);
                return () => clearInterval(intervalId);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        mapContext.setView(props.center, props.zoom)
    }, [loading, mapContext, props.center, props.zoom]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (

                <FeatureGroup>
                    <SightMarkers />

                    <TileLayer
                        url={OSM.tiler.url}
                        attribution={OSM.tiler.attribution}
                        {...OSM.tiler.interaction}
                    />
                    <Marker position={props.center} icon={gatewayIcon}>
                        <Popup direction="top" opacity={1}>
                            <div style={{ textAlign: 'center', fontSize: '16px' }}>
                                <div><strong>{`Statistics last update:`} <br /> {`${ lastUpdateTime } `}</strong></div>
                                <div>{`RSSI metrics: [${ liveData.MinRssi }, ${ liveData.MaxRssi }] dBm`}</div>
                                <div>{`Average RSSI: ${ liveData.AverageRssi } dBm`}</div>
                                <div>{`Median RSSI: ${ liveData.MedianRssi } dBm`}</div>
                                <div>{`SNR metrics: [${ liveData.MinSnr }, ${ liveData.MaxSnr }] dBm`}</div>
                                <div>{`Average SNR: ${ liveData.AverageSnr } dBm`}</div>
                                <div>{`Median SNR: ${ liveData.MedianSnr } dBm`}</div>
                                <div>{`Measurements: ${ liveData.Measurements }`}</div>
                            </div>
                        </Popup>
                    </Marker>
                </FeatureGroup>
            )}
        </>
    );
}
