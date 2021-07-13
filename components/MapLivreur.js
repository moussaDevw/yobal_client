

import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect,Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, {PROVIDER_GOOGLE,Marker, Geojson, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import haversine from "haversine";
import { AntDesign } from '@expo/vector-icons';

// navigator.geolocation = require('@react-native-community/geolocation');

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 18.7934829;
const LONGITUDE = 98.9867401;

export default class Map extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      mine: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        routeCoordinates : [],
        distanceTravelled: 0,  // contain live distance
        prevLatLng: {}, // contain pass lat and lang value
        error: null
      },
      customer: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        routeCoordinates : [],
        distanceTravelled: 0,  // contain live distance
        prevLatLng: {}, // contain pass lat and lang value
        error: null
      }
      
    };
  } 
  

  componentDidMount() {
   

    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);

        this.setState({
          mine: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          }
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );

    // Watch User POSITION
    navigator.geolocation.watchPosition(
      position => {
      //  console.log('changed position : ' + position);
       const { latitude, longitude } = position.coords;
       const {routeCoordinates, distanceTravelled} = this.state;
       const newCoordinates = {latitude, longitude};


      //   let order = {id: 4, customer: {id: "adnane"}};
      //  this.props.route.params.socket.emit('deliveryman-location', { latitude, longitude, customer: order.customer.id});
       this.setState({
        mine : {
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat(newCoordinates),
          distanceTravelled: distanceTravelled + this.calcDistance(newCoordinates),
          prevLatLng: newCoordinates
       }
      })
      }, 
      error => console.log(error),
      { 
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      },
      
     );
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state; 
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMyRegion = () => ({
    latitude: this.state.mine.latitude,
    longitude: this.state.mine.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  getCustomerLocation =  () => ({
    latitude: this.state.customer.latitude,
    longitude: this.state.customer.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  })

  render(){
    return (
      <View style={styles.container}>
        <AntDesign 
            name='close'
            size={28}
            style={{
                position:'absolute',
                top: 20*2,
                right:10,
                zIndex:2
            }}
            color={"#333"}
            onPress={()=>{
                this.props.navigation.goBack();
            }}
        />  
        <MapView
            provider={PROVIDER_GOOGLE}
            region={this.getMyRegion()}
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={{ ...StyleSheet.absoluteFillObject }}            
            
        >
            <Polyline coordinates={this.state.routeCoordinates} strokeWidth={2} />
            {/* <Marker coordinate={this.getDeliveryManRegion()} /> */}
            <Marker coordinate={this.getCustomerLocation()} />       
        </MapView>
        <View style={styles.distanceContainer}>
          <Text style={{fontSize:20, fontFamily:'Poppins-Regular'}} >{parseFloat(this.state.distanceTravelled).toFixed(2)} Km</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    ...StyleSheet.absoluteFill
  },
  shadow:{
    shadowColor: 'black',
    shadowOpacity: 9.5,
    shadowRadius: 5,
    // iOS
    shadowOffset: {
        width: 0,            // These can't both be 0
        height: 10,           // i.e. the shadow has to be offset in some way
    },
    // Android
    shadowOffset: {
        width: 0,            // Same rules apply from above
        height: 10,           // Can't both be 0
    },    
  },
  distanceContainer: {
    flexDirection: "row",
    position: 'absolute',
    bottom:0,
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});