import { useEffect } from "react";
import L from "leaflet";

function Legend({ map }) {
    useEffect(() => {
    if (map) {
        const getColor = value => {
            return value >= -95 ? "red"
                 : value >= -100 ? "orange"
                 : value >= -105 ? "yellow"
                 : value >= -110 ? "green"
                 : value >= -115 ? "blue"
                 : "purple";
        };
        const legend = L.control({ position: "bottomleft" });

        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend");
            const grades = [-90, -95, -100, -105, -110, -115];
            let labels = [];
            let from, to;

            for (from = 0; from < grades.length - 1; from++) {
                to = from + 1;
                labels.push(
                    '<i style="background:' + getColor(grades[to]) +
                    '">&nbsp&nbsp&nbsp&nbsp</i> &nbsp' + 
                    grades[from] + (grades[to] ? "dB to " + grades[to] : "") + "dB"
                );
            }
            labels.push('<i style="background:' + getColor(grades[to + 1]) + '">&nbsp&nbsp&nbsp&nbsp</i> &nbsp&lt; ' + grades[from] + 'dB');

            div.innerHTML = labels.join("<br>");
            return div;
        };

        legend.addTo(map);
    }
    }, [map]);
    return null;
}

export default Legend;