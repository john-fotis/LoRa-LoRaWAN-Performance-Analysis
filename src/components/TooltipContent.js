import { Tooltip } from "react-leaflet";

export const circleTooltip = (sf, point) => {
    return (
        <Tooltip direction="right" opacity={1}>
            <div><strong>{`Spreading Factor: ${sf} `}</strong></div>
            <div>{`RSSI metrics: [${point.MinRssi}, ${point.MaxRssi}] dB`}</div>
            <div>{`Average RSSI: ${point.AverageRssi} dB`}</div>
            <div>{`Median RSSI: ${point.MedianRssi} dB`}</div>
            <div>{`SNR metrics: [${point.MinSnr}, ${point.MaxSnr}] dB`}</div>
            <div>{`Average SNR: ${point.AverageSnr} dB`}</div>
            <div>{`Median SNR: ${point.MedianSnr} dB`}</div>
            <div>{`Measurements: ${point.Measurements}`}</div>
            <div>{`Packet Delivery Ratio: ${point.PDR}%`}</div>
        </Tooltip>
    );
};

export const maxRangeTooltip = (sf, point) => {
    return (
        <Tooltip direction="top" opacity={1}>
            <div><strong>{`Spreading Factor: ${sf}`}</strong></div>
            <div>{`RSSI: ${point.Rssi} dB`}</div>
            <div>{`SNR: ${point.Snr} dB`}</div>
            <div>{`Distance: ${Math.round(point.Distance, 0)} m`}</div>
        </Tooltip>
    );
};