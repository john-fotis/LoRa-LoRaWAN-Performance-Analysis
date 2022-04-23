import { Tooltip } from "react-leaflet";

export const circleTooltip = (sf, point) => {
    return (
        <Tooltip direction="right" opacity={1}>
            <div>{`Spreading Factor: ${sf} `}</div>
            <div>{`RSSI metrics: [${point.MinRSSI}, ${point.MaxRSSI}] dB`}</div>
            <div>{`Average RSSI: ${point.AverageRSSI} dB`}</div>
            <div>{`Median RSSI: ${point.MedianRSSI} dB`}</div>
            <div>{`SNR metrics: [${point.MinSnr}, ${point.MaxSnr}] dB`}</div>
            <div>{`Average SNR: ${point.AverageSNR} dB`}</div>
            <div>{`Median SNR: ${point.MedianSNR} dB`}</div>
            <div>{`Measurements: ${point.Measurements}`}</div>
            <div>{`Packet Delivery Ratio: ${point.PDR}%`}</div>
        </Tooltip>
    );
};

export const maxRangeTooltip = (sf, point) => {
    return (
        <Tooltip direction="top" opacity={1}>
            <div>{`Spreading Factor: ${sf} `}</div>
            <div>{`RSSI: ${point.RSSI} dB`}</div>
            <div>{`SNR: ${point.SNR} dB`}</div>
            <div>{`Distance: ${Math.round(point.Distance, 0)} m`}</div>
        </Tooltip>
    );
};