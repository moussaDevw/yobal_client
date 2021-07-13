
import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import MapView, {PROVIDER_GOOGLE,Marker, Geojson} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import Slide from './Lottie/Slide'
import { Dimensions } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { BlurView } from 'expo-blur';


navigator.geolocation = require('@react-native-community/geolocation');


const { height, width } = Dimensions.get( 'window' );

const MapComponent = ({toggleModal, validatePosition, onRegionChange, region, adress, myPosition ,isModalVisible}) => {
  return(
    <View style={styles.container}>
    {myPosition && <MapView      
      provider={PROVIDER_GOOGLE}    
      showsUserLocation={true}
      showsMyLocationButton={true}
      followsUserLocation={true}          
      style={styles.map}
      initialRegion={myPosition}
      onRegionChange={onRegionChange}
      onUserLocationChange={(coord) => console.log(coord)}
    >
      
      <Marker
        draggable
        key={1}
        coordinate={region}
        title={"Hey Abderrahmane"}
        description={'Vous êtes ici !'}
      >
        <View style={{backgroundColor: "transparent",alignItems: 'center',justifyContent: 'center',}}>                        
            <Image source={require('../assets/images/pin.png')} />            
        </View>
      </Marker> 

    </MapView>}


    {myPosition && 
    <View style={{position:'absolute', bottom:100, alignItems: 'center',}}>          
      <View style={{alignItems:'center', marginBottom:20, borderRadius:20, overflow:'hidden'}}>
      <BlurView style={{padding:20, }} intensity={100}>
        <Text style={{fontFamily:'Poppins-SemiBold', fontSize:16}}>{adress}</Text>      
      </BlurView>
        
      </View>
      <TouchableOpacity onPress={toggleModal} style={{borderRadius:20, backgroundColor:'#3b5998',width:200, paddingVertical:20, alignItems: 'center', justifyContent: 'center',}}>
        <Text style={{fontFamily:'Poppins-SemiBold', color:'#FFF'}}>Valider ma position</Text>
      </TouchableOpacity>
    </View>}

    <Modal  isVisible={isModalVisible} >
        <View style={{backgroundColor:'#FFF', borderRadius:20, alignItems: 'center', justifyContent: 'center',padding:60}}>            
          <Text style={{fontFamily:'Poppins-Bold', fontSize:20, textAlign:'center'}}>Vous êtes localisé dans cette adresse</Text>
          <View>
            <Image style={{width:80, height:80, resizeMode:"contain"}} source={require('../assets/images/map.png')} />   
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>              
            {/* <Image style={{width:120, height:120, resizeMode:"contain", borderRadius:20, overflow:'hidden'}} source={require('../assets/images/stlouis.jpg')} />    */}
            <Text style={{fontFamily:'Poppins-SemiBold', paddingLeft:10, textAlign:'center'}}>{adress}</Text>
          </View>
          <View style={{flexDirection:'row',  justifyContent:'space-between'}}>   
            <TouchableOpacity style={styles.buttons} onPress={toggleModal}>
              <Text style={{color:"#FFF", fontFamily:'Poppins-ExtraLight'}}>Fermer</Text>
            </TouchableOpacity>           
            <TouchableOpacity style={styles.buttons} onPress={validatePosition}>
              <Text  style={{color:"#FFF",  fontFamily:'Poppins-ExtraLight'}}>Valider</Text>
            </TouchableOpacity>
          </View>            
        </View>
    </Modal>
    
  </View>  
  )
}

export default function Map({navigation, route}) {


  const [region, setRegion] = useState(getInitialState)
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adress, setAdress] = useState(null);
  const [myPosition, setMyPosition] = useState(null)
  const [error, setError] = useState(false)
  

  useEffect(() => {
    getMyPosition()
  }, [])

  const getMyPosition = async() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude);
        setMyPosition(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.28,
            longitudeDelta: 0.28 * (width / height),
            error: null,
          }
        )
      },
      error => {setError(error); console.log('error parsing my position')},
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
  }

  const getInitialState = () => {
    return({
        latitude: 32.8870,
        longitude: -6.9009,
        latitudeDelta: 0.28,
        longitudeDelta: 0.28 * (width / height),
    })    
  }

  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const validatePosition = async() => {    

    setLoading(true)
    setTimeout(()=>{
      navigation.goBack()
    },1000)
  }

  const fetchAdress = async (region) => {
    const value = await Geocoder.from({
      lat : region.latitude,
      lng : region.longitude
    });
    const result = value.results[0];
    setAdress(result.formatted_address)
  }

  const onRegionChange = (region) => {
    setRegion(region);
    fetchAdress(region)
  }


  if(loading){
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Slide source={require("../assets/json/check.json")}/>
        <Text style={{fontFamily:'Poppins-Bold', marginTop:40, fontSize:25}}>Position Ajoutée</Text>
      </View>
    )    
  }
  else{
    return (
      <View style={{flex:1}}>
        <MapComponent isModalVisible={isModalVisible} toggleModal={toggleModal} validatePosition={validatePosition} onRegionChange={onRegionChange} region={region} adress={adress} myPosition={myPosition} />
      </View>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    ...StyleSheet.absoluteFill,    
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
  buttons:
  {backgroundColor:'#3b5998', padding:10, margin:10, borderRadius:20}
});
