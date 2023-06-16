function MapComponent(): JSX.Element {
    return (
        <div style={{width: "90%", }}>
            <iframe width="100%" height="400" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=500&amp;height=400&amp;hl=en&amp;q=-1.291013,%2036.875810+(Nairobi)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            <a href="https://www.maps.ie/draw-radius-circle-map/">Google radius map</a>
        </div>
    );
}
export default MapComponent;