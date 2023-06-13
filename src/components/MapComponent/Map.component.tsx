import {Marker, GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
type Props={
    isMarkedShow: boolean,
    lat: number,
    lng: number
}
function MapComponent({isMarkedShow, lat, lng}: Props): JSX.Element {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: lat, lng: lng }}
        >
            {isMarkedShow && <Marker position={{ lat: lat, lng: lng }} />}
        </GoogleMap>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withScriptjs(withGoogleMap(MapComponent));