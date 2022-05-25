import { Tooltip } from "react-leaflet";

export const circleTooltip = (sf, point) => {
    return (
        <Tooltip direction="right" opacity={1}>
            <div><strong>{`Spreading Factor: ${sf} `}</strong></div>
            <div>{`RSSI metrics: [${point.MinRssi}, ${point.MaxRssi}] dBm`}</div>
            <div>{`Average RSSI: ${point.AverageRssi} dBm`}</div>
            <div>{`Median RSSI: ${point.MedianRssi} dBm`}</div>
            <div>{`SNR metrics: [${point.MinSnr}, ${point.MaxSnr}] dBm`}</div>
            <div>{`Average SNR: ${point.AverageSnr} dBm`}</div>
            <div>{`Median SNR: ${point.MedianSnr} dBm`}</div>
            <div>{`Measurements: ${point.Measurements}`}</div>
            <div>{`Packet Delivery Ratio: ${point.PDR}%`}</div>
        </Tooltip>
    );
};

export const maxRangeTooltip = (sf, point) => {
    return (
        <Tooltip direction="top" opacity={1}>
            <div><strong>{`Spreading Factor: ${sf}`}</strong></div>
            <div>{`RSSI: ${point.Rssi} dBm`}</div>
            <div>{`SNR: ${point.Snr} dBm`}</div>
            <div>{`Distance: ${Math.round(point.Distance, 0)} m`}</div>
        </Tooltip>
    );
};