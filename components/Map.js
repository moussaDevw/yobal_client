
import React,{useState, useEffect, useContext, useRef} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import MapView, {PROVIDER_GOOGLE,Marker, Geojson} from 'react-native-maps';
import Modal from 'react-native-modal';
import Slide from './Lottie/Slide'
import { Dimensions } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconFeather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../navigation/AuthProvider'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from '@ui-kitten/components';
import Geolocation from 'react-native-geolocation-service';
import {getAdress} from '../src/DataController'


const animation = {
  0 : {translateY: 300},
  1 : {translateY: 0}
}


const { height, width } = Dimensions.get( 'window' );

export default function Map({navigation, route}) {

  const mapRef = useRef()

  const {setUserAdress, setChosenAdress, user} = useContext(AuthContext)
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myPosition, setMyPosition] = useState(null)
  
    
    // KHOURIBGA ADRESS
    // {
    //   latitude: 32.8870,
    //   longitude: -6.9009,
    //   latitudeDelta: 0.28,
    //   longitudeDelta: 0.28 * (width / height),
    // }
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0)

  // Data to send 
  const [region, setRegion] = useState(getInitialState)
  const [adress, setAdress] = useState(null);
  const [city, setCity] = useState(null);
  const [immeuble, setImmeuble] = useState(null);
  const [secteur, setSecteur] = useState(null);
  const [floor, setFloor] = useState(null);
  const [appartment, setAppartment] = useState(null);  
  const [positionError , setPositionError] = useState(null)
  

  const fullName = user.user.fullName
  // const verifyAdress = (response) => {
  //   if(response.error){
  //     setPositionError(response.message)
  //   }
  // }

  const sendAdress = async() => {
    // alert(city)
    AsyncStorage.getItem('userToken').then(async(token_result) => {   
      const parsedToken = JSON.parse(token_result);                      
      try{              
        const response = await fetch(`https://api.yobalapp.com/adress`, {
          method: 'POST',                    
          headers: {
              Accept:  'application/json',               
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + parsedToken
          },
          body: JSON.stringify({
            longitude:region.longitude,
            latitude:region.latitude,
            latitudeDelta:region.latitudeDelta,
            longitudeDelta:region.longitudeDelta,
            streetName: adress,      
            buildingNumber: immeuble,
            active:true,
            city: city,            
          })
        })
        const responseJson = await response.json();       
        getAdress(setUserAdress, setChosenAdress)
        // verifyAdress(responseJson)
        console.log(responseJson)        
    }         
      catch{
        err => console.log(err)
      }  
    })        
  }


  useEffect(() => {
    getMyPosition()
  }, [])

  const getMyPosition = async() => {
    Geolocation.getCurrentPosition(
      (position) => {
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
      (error) => {
        // See error code charts below.
        console.log('error parsing location data',error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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
    await sendAdress()

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
    const fomattedAdress = result.formatted_address;
    const cityName =  fomattedAdress.split(', ')    
    setCity(cityName[1])
    setAdress(result.formatted_address)
  }

  const onRegionChange = (region) => {
    setRegion(region);
    fetchAdress(region)
  }

  const goToLocation = (selectedAdress) => {
    if(selectedAdress){
      mapRef.current.animateToRegion({
        latitude: selectedAdress.lat,
        longitude: selectedAdress.lng,
        latitudeDelta: 0.28,
        longitudeDelta: 0.28 * (width / height),
        error: null,
      })
    }
  }

  const getMyLocation = () => {

    Geolocation.getCurrentPosition(
      (position) => {
        mapRef.current.animateToRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.28,
          longitudeDelta: 0.28 * (width / height),
          error: null,
        })
      },
      (error) => {
        // See error code charts below.
        console.log('error parsing location data',error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const mapComponent = () => {    
    console.log(myPosition)
    return(
      <View style={styles.container}>
      {myPosition ? <MapView      
        provider={PROVIDER_GOOGLE}    
        showsUserLocation={true} 
        showsUserLocationButton={false}        
        followsUserLocation={true}          
        style={styles.map}
        initialRegion={myPosition}
        onRegionChangeComplete={onRegionChange}
        onUserLocationChange={(coord) => console.log(coord)}
        ref = {mapRef}
      >
        
        {region && <Marker
          draggable
          key={1}
          coordinate={region}
          title={"Hey " + fullName}
          description={'Vous êtes ici !'}
        >
          <View style={{backgroundColor: "transparent",alignItems: 'center',justifyContent: 'center',}}>                        
              <Image source={require('../assets/images/pin.png')} />            
          </View>
        </Marker> }
        
      </MapView> : <ActivityIndicator color='#3b5998' size={'large'} />}


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

        <View style={{alignSelf:'stretch', position:'absolute', top:20, width:'100%'}}>
          <GooglePlacesAutocomplete
            fetchDetails = {true}
            placeholder='Ex: Avenue France, Agdal, Bloc 38'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              goToLocation(details.geometry.location);
            }}
            query={{
              key: 'AIzaSyD6tk8dFF4GDnB0iABV95Zs_CCOZ92K9sw',
              language: 'ar',
            }}

            textInputProps={{
              InputComp: Input,
              leftIcon: { type: 'font-awesome', name: 'chevron-left' },
              errorStyle: { color: 'red' },
            }}

            styles={{
              description:{
                borderRadius:20,
                fontFamily:'Poppins-Light'
              },
              listView:{
                zIndex:600
              }
            }}        
          />
        </View>

        <View style={{position:'absolute', top:50, left:10}}>
          <IconFeather style={{padding:20}} onPress={() => navigation.goBack()} name='arrow-left' size={30} />
        </View>

        <View style={[{position:'absolute', top:80, right:10,  height:50,  }, styles.shadow]}>
          <TouchableOpacity onPress={getMyLocation}  style={[{alignItems:'center', justifyContent: 'center', flexDirection:'row', backgroundColor:'#FFF', flex:1, borderRadius:10, backgroundColor:'#FFF', padding:10}]}>
            <Text style={{fontFamily:'Poppins-SemiBold'}}>Ma Position</Text>
            <IconFeather style={{padding:20, marginLeft:10}} name='navigation' size={30} />
          </TouchableOpacity>
          
        </View>

        <View style={{marginRight:30}}>
          <Image source={require('../assets/images/point.png')} /> 
        </View>

  
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
              <TouchableOpacity style={styles.buttons} onPress={() => setPage(1)}>
                <Text  style={{color:"#FFF",  fontFamily:'Poppins-ExtraLight'}}>Valider</Text>
              </TouchableOpacity>
            </View>            
          </View>
      </Modal>
      
    </View>  
    )
  }

  const adressForm = () => {
    return(
      <Animatable.View useNativeDriver animation={animation} style={{flex:1, paddingTop:20}} >

        <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center', marginBottom:10}}>          
            <View style={{flex:1, alignSelf:'stretch',padding:10,justifyContent: 'center'}}>
              <View style={{flexDirection:'row', marginBottom:10}}>
                <Image style={{width:20, height:20}} source={require('../assets/images/pin.png')} />
                <Text style={{paddingLeft:10, fontFamily:'Poppins-SemiBold', fontSize:16}}>Numéro d'immeuble</Text>
              </View>
              <TextInput onChangeText={(value) => setImmeuble(value)} placeholder={'Rabat, California, Route 24, BLOC 39'} placeholderStyle={{fontFamily:'Poppins-Light'}} numberOfLines={2}  style={styles.textAreaStyle} >

              </TextInput>
            </View>        
          </View>     

          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
            <View style={{flex:1, alignSelf:'stretch',padding:10,justifyContent: 'center'}}>
              <View style={{flexDirection:'row', marginBottom:10}}>
                <Image style={{width:20, height:20}} source={require('../assets/images/pin.png')} />
                <Text style={{paddingLeft:10, fontFamily:'Poppins-SemiBold', fontSize:16}}>Le nom du secteur</Text>
              </View>
              <TextInput onChangeText={(value) => setSecteur(value)} placeholder={'Rabat, California, Route 24, BLOC 39'} placeholderStyle={{fontFamily:'Poppins-Light'}} numberOfLines={2}  style={styles.textAreaStyle} >

              </TextInput>
            </View>        
          </View>    
          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
            <View style={{flex:1, alignSelf:'stretch',padding:10,justifyContent: 'center'}}>
              <View style={{flexDirection:'row', marginBottom:10}}>
                <Image style={{width:20, height:20}} source={require('../assets/images/pin.png')} />
                <Text style={{paddingLeft:10, fontFamily:'Poppins-SemiBold', fontSize:16}}>Insérer votre étage</Text>
              </View>
              <TextInput onChangeText={(value) => setFloor(value)} placeholder={'Rabat, California, Route 24, BLOC 39'} placeholderStyle={{fontFamily:'Poppins-Light'}} numberOfLines={2}  style={styles.textAreaStyle} >

              </TextInput>
            </View>        
          </View>    

          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
            <View style={{flex:1, alignSelf:'stretch',padding:10,justifyContent: 'center'}}>
              <View style={{flexDirection:'row', marginBottom:10}}>
                <Image style={{width:20, height:20}} source={require('../assets/images/pin.png')} />
                <Text style={{paddingLeft:10, fontFamily:'Poppins-SemiBold', fontSize:16}}>Numéro d'appartment</Text>
              </View>
              <TextInput onChangeText={(value) => setAppartment(value)} placeholder={'Rabat, California, Route 24, BLOC 39'} placeholderStyle={{fontFamily:'Poppins-Light'}} numberOfLines={2}  style={styles.textAreaStyle} >

              </TextInput>
            </View>        
          </View>   

          <View style={{flex: 1, alignItems: 'center',}}>
                <Text style={{fontFamily:'Poppins-Bold', color:'red', marginBottom:10}}>{positionError}</Text>
                <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:1 ,alignItems: 'center',}}>
                    <TouchableOpacity onPress={()=> setPage(0)} style={[{padding:20, backgroundColor:'#FFF',borderRadius:20}, styles.shadowInput]}>
                      <Text style={{fontFamily:'Poppins-Bold', fontSize:20,}}>RETOUR</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:1, alignItems: 'center',}}>
                    <TouchableOpacity onPress={() => validatePosition()} style={[{padding:20, backgroundColor:'#758ab6', borderRadius:20}, styles.shadowInput]}>
                      <Text style={{fontFamily:'Poppins-Bold', fontSize:20, color:'#FFF'}}>CONFIRMER</Text>
                    </TouchableOpacity>
                  </View>
                </View>
          </View>
        </ScrollView>      
    </Animatable.View>
    )    
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
        {page === 0 && mapComponent()}
        {page === 1 && adressForm()}
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
  {backgroundColor:'#3b5998', padding:10, margin:10, borderRadius:20},
  shadowInput:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.65,
    
    elevation: 10,
  },
  distanceContainer: {
    flexDirection: "row",
    position: 'absolute',
    bottom:0,
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  choice:{
    fontFamily:'Poppins-Bold',
    fontSize:15,
    marginHorizontal:20,
  },
  textAreaStyle:{
    textAlignVertical:'top',
    borderColor:'#d8d8d8',
    borderWidth:2,
    borderRadius:20,
    fontFamily:'Poppins-Regular',
    padding:20,
    backgroundColor:'#f2f2f2'
  },
  truck:{    
    padding:20,
    borderRadius:20,
    marginHorizontal:5,    
    backgroundColor:'#23d074',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.65,
    
    elevation: 10,
  },
  workers:{    
    padding:20,
    borderRadius:20,
    marginHorizontal:5,
    // width:'28%',
    // height:'100%',
    backgroundColor:'#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.65,
    
    elevation: 10,
  },
  centerContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',    
    width:'100%'
  },
  tarifContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:30,
    width:'100%'
  },
  shadowContrast:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 3.20,
    shadowRadius: 9.65,
    
    elevation:5,
  }
});
