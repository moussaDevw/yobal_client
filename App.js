import React,{useState, useEffect, useContext} from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

import {  
  FeaturesScreen,
  ServicesScreen,
  PortfolioScreen,
  CareersScreen,
} from './Screens';

import CustomDrawer from './components/Drawer/CustomDrawer';
import {loadAsync} from "expo-font";
import {AppLoading} from "expo";
import SocketIOClient from 'socket.io-client/dist/socket.io.js'
import { AuthProvider } from './navigation/AuthProvider';
import { AuthContext } from './navigation/AuthProvider';

import AuthStack from './navigation/AuthStack'
import AppStack from './navigation/AppStack'
import Adresses from './screens/Adresses'
import Commandes from './screens/Commandes'
import Config from './config';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {alreadyLogedIn} from './src/DataController'

const Drawer = createDrawerNavigator();

Geocoder.init("AIzaSyD6tk8dFF4GDnB0iABV95Zs_CCOZ92K9sw");

const MainApp = ({navigation}) => {
  

  const [socket, setSocket] = useState();
  const {user, setUser, setSpinner} = useContext(AuthContext);  
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {

    setUser(user);
    let socket = SocketIOClient(Config.node);

    socket.on('connect', () => {
      console.log("conneced", socket.id)
      setSocket(socket)

      socket.emit('custmer-join', {user} , (result) => {
        console.log(result)
      })  

      
      })
      socket.on('connect_error', (error) => {

      }); 

      socket.on('disconnect', (reason) => {

      });
    
      socket.on('reconnect_attempt', () => {

      });

      socket.on('reconnecting', () => {

      });
    console.log('onAuthStateChanged, user =>', user)
    if (initializing) setInitializing(false);
  };

  const userVerif = async () => {    
    const tokenValue = await AsyncStorage.getItem('userToken')
    if(tokenValue){      
      alreadyLogedIn(setSpinner, setUser)
    }
  }

  useEffect(() => {
    userVerif()
  }, []);

  return (
    user ? <AppStack socket={socket} /> : <AuthStack />
  );
}

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false)
  
  fetchFonts = () => {
    return (
        loadAsync({
          'Poppins-ExtraLight' : require('./assets/fonts/poppins/Poppins-ExtraLight.ttf'),
          'Poppins-Medium' : require('./assets/fonts/poppins/Poppins-Medium.ttf'),
          'Poppins-Regular' : require('./assets/fonts/poppins/Poppins-Regular.ttf'),
          'Poppins-SemiBold' : require('./assets/fonts/poppins/Poppins-SemiBold.ttf'),
          'Poppins-Bold' : require('./assets/fonts/poppins/Poppins-Bold.ttf'),
          'Cairo-Bold' : require('./assets/fonts/cairo/Cairo-Bold.ttf'),
          'Cairo-ExtraLight' : require('./assets/fonts/cairo/Cairo-ExtraLight.ttf'),
          'Cairo-Light' : require('./assets/fonts/cairo/Cairo-Light.ttf'),
          'Cairo-Regular' : require('./assets/fonts/cairo/Cairo-Regular.ttf')
        })
    );
  } 

  if(!fontsLoaded){
    return(
      <AppLoading 
        startAsync={()=> fetchFonts()}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }
  else{
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar hidden />
            <Drawer.Navigator
              initialRouteName={'MainApp'}
              drawerStyle={{
                backgroundColor: 'transparent',
                width: 0,
              }}
              overlayColor='transparent'
              drawerType='permanent'
              drawerContent={(props) => {
                return (
                  <CustomDrawer
                    navigation={props.navigation}
                    routes={props.state.routeNames}
                    selectedRoute={props.state.routeNames[props.state.index]}
                  />
                );
              }}
            >
              <Drawer.Screen name='MainApp' component={MainApp} />
              <Drawer.Screen name='About Yobal' component={FeaturesScreen} />          
              <Drawer.Screen name='Services' component={ServicesScreen} />
              <Drawer.Screen name='Adresses' component={Adresses} />
              <Drawer.Screen name='Contact' component={PortfolioScreen} />    
              <Drawer.Screen name='Commandes' component={Commandes} />            
            </Drawer.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ApplicationProvider>
    );
  }  
}