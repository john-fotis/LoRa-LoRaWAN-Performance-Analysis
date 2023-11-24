import React from "react";
import { MapContainer } from "react-leaflet";
import ScenariosContent from "./ScenariosContent";

export default function ScenariosView (props) {
    return (
        <MapContainer
            center={props.center}
            zoom1={props.zoom1}
            zoom2={props.zoom2}
        >
            <ScenariosContent {...props} />
        </MapContainer>
    );
}