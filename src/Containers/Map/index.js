import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

const Map = () => {
const deals = useSelector(state => state.deals.deals);
const [markers, setMarkers] = useState([])
useEffect(()=>{
    const marks = []
    deals.map(item => {
        let obj = {}
        obj.latitude = item.dLatitude;
        obj.logitude = item.dLongitude;
        marks.push(obj)
    })
    setMarkers(marks)
},[deals])


useEffect(()=>{
    mapRef.current.fitToCoordinates(markers);
},[markers])

const mapRef = useRef();

  return (
    <View style={styles.mapView}>
        <MapView
            key={Math.random()}
            ref={mapRef}
            style={styles.map}
            // minZoomLevel={8}
            // maxZoomLevel={15}
            initialRegion={{
                latitude: -33.8657305000,
                longitude: 151.2073300000,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
        >
            {markers.map((item, index)=>{
                return (
                <Marker key={index} coordinate={item}>
                    <Image source={require('../../Assets/MapPin.png')} style={styles.marker}/>
                </Marker>
                )
            })}
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
    mapView:{
        flex: 1,
    },
    map:{
        flex: 1
    },
    marker: {
        height: 30,
        width: 30,
    }
})

export default Map;