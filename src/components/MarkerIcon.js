import { Icon } from "leaflet";
import redCircle from "../assets/icons/redCircle.png";
import orangeCircle from "../assets/icons/orangeCircle.png";
import yellowCircle from "../assets/icons/yellowCircle.png";
import greenCircle from "../assets/icons/greenCircle.png";
import blueCircle from "../assets/icons/blueCircle.png";
import purpleCircle from "../assets/icons/purpleCircle.png";
import antennaIcon from "../assets/icons/antenna.png";

const selectIcon = (value) => {
  return value >= -95 ? redIcon
       : value >= -100 ? orangeIcon
       : value >= -105 ? yellowIcon
       : value >= -110 ? greenIcon
       : value >= -115 ? blueIcon
       : purpleIcon;
};

export const redIcon = new Icon({
  iconUrl: redCircle,
  iconSize: [20, 20],
});

export const orangeIcon = new Icon({
  iconUrl: orangeCircle,
  iconSize: [20, 20],
});

export const yellowIcon = new Icon({
  iconUrl: yellowCircle,
  iconSize: [20, 20],
});

export const greenIcon = new Icon({
  iconUrl: greenCircle,
  iconSize: [20, 20],
});

export const blueIcon = new Icon({
  iconUrl: blueCircle,
  iconSize: [20, 20],
});

export const purpleIcon = new Icon({
  iconUrl: purpleCircle,
  iconSize: [20, 20],
});

export const gatewayIcon = new Icon({
  iconUrl: antennaIcon,
  iconSize: [25, 25],
});

export default selectIcon;