import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import FormInput from '../components/myLogin/FormInput';
import FormButton from '../components/myLogin/FormButton';
import SocialButton from '../components/myLogin/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [nom, setNom] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register, setSpinner, setUser} = useContext(AuthContext);

  const signup_handler = async () => {
    console.log({            
      email: email,
      fullName: nom,
      phone: phone,
      password: password,
      typeId: 2,        
    })
    setSpinner(true) 
    // await register(email, password)                          
    const response = await fetch(`https://api.yobalapp.com/signup`, {
      method: 'POST',
      headers: {
          Accept:  'application/json',                 
          'Content-Type': 'application/json',          
      },
      body: JSON.stringify({            
        email: email,
        fullName: nom,
        phone: phone,
        password: password,
        // typeId: 2,        
      })
    })
    const responseJson = await response.json();       
    console.log(responseJson)
    await AsyncStorage.setItem('userToken', JSON.stringify(responseJson.token))
    setUser(responseJson)
         
    setSpinner(false)              
}

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Création de compte</Text>

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
        labelValue={nom}
        onChangeText={(nom) => setNom(nom)}
        placeholderText="Nom complet"
        iconType="user"
        // keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={phone}
        onChangeText={(phone) => setPhone(phone)}
        placeholderText="Numéro de téléphone"
        iconType="phone"
        keyboardType="phone-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Mot de passe"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirmation de mot de passe"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => signup_handler()}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          En vous inscrivant vous acceptez nos{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('A remplir')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Conditions d'utilisations
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> et  </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Politique de sécurité
        </Text>
      </View>


      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.navButtonText}>Vous avez déja un compte ? Connectez vous</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Poppins-ExtraLight',
    textAlign:'center'
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Poppins-ExtraLight',
    color: 'grey',
  },
});
