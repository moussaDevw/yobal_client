import React, {useState, useEffect, useContext} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapLivreur  from '../components/MapLivreur'
import MapUser  from '../components/Map'
import Home from '../screens/Home'
import BrandDetails  from '../screens/BrandDetails'
import BrandList  from '../screens/BrandList'
import FoodMenu  from '../screens/FoodMenu'
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { AuthContext } from '../navigation/AuthProvider';
import {getAdress} from '../src/DataController'


const Stack = createStackNavigator();
const Tabs = AnimatedTabBarNavigator();

const AppStack = ({socket, navigation}) => {  

  const {setUserAdress, setChosenAdress} = useContext(AuthContext)

  useEffect(() => {
    getAdress(setUserAdress, setChosenAdress)

  },[])


  return (
    <Stack.Navigator 
      initialRouteName={'Home'}
      screenOptions={{        
        headerShown: false,
      }}
    >      
      <Stack.Screen name="BrandList" component={BrandList} />      
      <Stack.Screen 
        name="Home" 
        component={Home} 
        initialParams={{socket: {id: "22222"}}}
      /> 
      <Stack.Screen 
        name="Map" 
        component={MapUser} 
        initialParams={{socket}}
        options={() => ({
        
          gestureEnabled: false,
          transitionSpec:{
            open: {animation: 'timing', config: {duration: 300}},
            close: {animation: 'timing', config: {duration: 300}}
          },
          cardStyleInterpolator:({current:{progress}}) => {
            return{
              cardStyle:{
                opacity: progress
              }
            }
          }
        })}
      />      
      <Stack.Screen name="BrandDetails" component={BrandDetails} 

      // OPTION FOR SHARED ELEMENTS TRANSITION !!!!!!!

      // options={() => ({
        
      //   gestureEnabled: true,
      //   transitionSpec:{
      //     open: {animation: 'timing', config: {duration: 300}},
      //     close: {animation: 'timing', config: {duration: 300}}
      //   },
      //   cardStyleInterpolator:({current:{progress}}) => {
      //     return{
      //       cardStyle:{
      //         opacity: progress
      //       }
      //     }
      //   }
      // })} 
      />
      <Stack.Screen name="FoodMenu" component={FoodMenu}  />
    </Stack.Navigator>
  );
};

export default AppStack;
