import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import MapContent from "./MapContent.js";
import Legend from "./Legend.js";

export default function MapView(props) {
  const [map, setMap] = useState(null);
  return (
    <MapContainer center={props.center} zoom={props.zoom1} whenCreated={setMap}>
      <MapContent {...props} />
      <Legend map = {map} />
    </MapContainer>
  );
}