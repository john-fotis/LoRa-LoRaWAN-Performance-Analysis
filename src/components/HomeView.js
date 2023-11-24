import React from "react";
import { MapContainer } from 'react-leaflet';
import HomeContent from "./HomeContent";

export default function HomeView (props) {
    return (
        <MapContainer
            center={props.center}
            zoom={props.zoom1}
        >
            <HomeContent {...props} />
        </MapContainer>
    );
}