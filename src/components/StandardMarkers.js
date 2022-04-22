import { FeatureGroup, Marker, Popup } from 'react-leaflet';
import { gatewayIcon, imgContentIcon } from './MarkerIcon.js';
import lorixOne from '../assets/misc/lorixOne.png';
import image1 from '../assets/misc/1.png';
import image2 from '../assets/misc/2.png';
import image3 from '../assets/misc/3.png';
import image4 from '../assets/misc/4.png';
import image5 from '../assets/misc/5.png';
import image6 from '../assets/misc/6.png';
import image7 from '../assets/misc/7.png';
import image8 from '../assets/misc/8.png';
import image9 from '../assets/misc/9.png';
import image10 from '../assets/misc/10.png';
import image11 from '../assets/misc/11.png';
import image12 from '../assets/misc/12.png';
import image13 from '../assets/misc/13.png';
import image14 from '../assets/misc/14.png';

const StandardMarkers = ({gatewayCoords}) => {
    return (
        <FeatureGroup>
            <Marker position={gatewayCoords} icon={gatewayIcon}>
                <Popup direction='top' opacity={1}><img src={lorixOne} alt='Gateway' width='200' height='200'/></Popup>
            </Marker>
            <Marker position={[37.970775, 23.766937]} icon={imgContentIcon}>
                <Popup><img src={image1} alt='image1' width='200' height='112'/></Popup>
            </Marker>
            <Marker position={[37.970761, 23.76733]} icon={imgContentIcon}>
                <Popup><img src={image2} alt='image2' width='200' height='85'/></Popup>
            </Marker>
            <Marker position={[37.970975, 23.767337]} icon={imgContentIcon}>
                <Popup><img src={image3} alt='image3' width='150' height='200'/></Popup>
            </Marker>
            <Marker position={[37.971705, 23.767391]} icon={imgContentIcon}>
                <Popup><img src={image4} alt='image4' width='150' height='200'/></Popup>
            </Marker>
            <Marker position={[37.973750, 23.76900]} icon={imgContentIcon}>
                <Popup><img src={image5} alt='image5' width='200' height='85'/></Popup>
            </Marker>
            <Marker position={[37.968129, 23.780362]} icon={imgContentIcon}>
                <Popup><img src={image6} alt='image6' width='150' height='200'/></Popup>
            </Marker>
            <Marker position={[37.967731, 23.779454]} icon={imgContentIcon}>
                <Popup><img src={image7} alt='image7' width='150' height='200'/></Popup>
            </Marker>
            <Marker position={[37.968361, 23.777449]} icon={imgContentIcon}>
                <Popup><img src={image8} alt='image8' width='150' height='200'/></Popup>
            </Marker>
            <Marker position={[37.967322, 23.782038]} icon={imgContentIcon}>
                <Popup><img src={image9} alt='image9' width='150' height='200'/></Popup>
            </Marker>
            <Marker position={[37.960231, 23.766416]} icon={imgContentIcon}>
                <Popup><img src={image10} alt='image10' width='200' height='150'/></Popup>
            </Marker>
            <Marker position={[37.960450, 23.766513]} icon={imgContentIcon}>
                <Popup><img src={image11} alt='image11' width='150' height='200'/></Popup>
            </Marker>
            <Marker position={[37.960359, 23.766984]} icon={imgContentIcon}>
                <Popup><img src={image12} alt='image12' width='200' height='85'/></Popup>
            </Marker>
            <Marker position={[37.960242, 23.767734]} icon={imgContentIcon}>
                <Popup><img src={image13} alt='image13' width='150' height='200'/></Popup>
            </Marker>
            <Marker position={[37.959684, 23.768323]} icon={imgContentIcon}>
                <Popup><img src={image14} alt='image14' width='200' height='85'/></Popup>
            </Marker>
        </FeatureGroup>
    );
};

export default StandardMarkers;