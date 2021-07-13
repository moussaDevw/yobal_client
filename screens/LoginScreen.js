import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FormInput from '../components/myLogin/FormInput';
import FormButton from '../components/myLogin/FormButton';
import SocialButton from '../components/myLogin/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();  

  const {login, setSpinner, setUser} = useContext(AuthContext);

  const login_handler = async () => {

    setSpinner(true) 
    // await login(email, password)                          
    const response = await fetch(`https://api.yobalapp.com/signin`, {
      method: 'POST',
      headers: {
          Accept:  'application/json',                 
          'Content-Type': 'application/json',          
      },
      body: JSON.stringify({            
        email: email,
        password: password,        
      })
    })
    const responseJson = await response.json();         
    console.log('login response   ',responseJson)
    await AsyncStorage.setItem('userToken', JSON.stringify(responseJson.token))
    setUser(responseJson)           
    setSpinner(false)              
  }  

  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        /*
      <Image
        source={require('../assets/rn-social-logo.png')}
        style={styles.logo}
      />
      */
      }
      {/* <Text style={styles.text}>Nom de l'APP</Text> */}
      <Image source={require("../assets/images/logo_yobal.png")} style={{width:200, height:200, resizeMode:'contain'}}/>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput        
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Mot de passe"
        iconType="lock"
        secureTextEntry={true}
        autoCorrect={false}
        // keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormButton
        buttonTitle="Se connecter"
        onPress={() => login_handler()}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {navigation.navigate('ForgotPass')}}>
        <Text style={styles.navButtonText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      {/* {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null} */}
      

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Vous n'avez pas de compte ? Inscrivez-vous
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Poppins-ExtraLight',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Poppins-ExtraLight',
    textAlign:'center'
  },
});
