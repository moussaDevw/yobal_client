import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Intro from '../screens/Intro'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

const Stack = createStackNavigator();

const AuthStack = () => {  

  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then((value) => {
  //     if (value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  
  // }, []);
  
  return (
    <Stack.Navigator 
      screenOptions={{        
        headerShown: false,
      }}
      initialRouteName={'Intro'}
    >
      <Stack.Screen name="Intro" component={Intro} />

      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen}
      />

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10, backgroundColor:'red', width:30, height:30, marginTop:20}}>
              <FontAwesome.Button 
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('LoginScreen')}
              />

            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
