
import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import {colors} from './colors';
import {SecondaryButton} from './SecondaryButton';
import {PrimaryInput} from './PrimaryInput';
import {PrimaryButton} from './PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
// import { GoogleSignin } from '@react-native-community/google-signin';
// import auth from '@react-native-firebase/auth';


const animationRight = {
  0 : {opacity : 0, translateX: 50},
  1 : {opacity : 1, translateX: 0}
}

const animationLeft = {
  0 : {opacity : 0, translateX: -50},
  1 : {opacity : 1, translateX: 0}
}
const AnimatableImage = Animatable.createAnimatableComponent(Image);

const Login = ( {navigation, route} ) => {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '744106339011-nhon946uhkoe44s783gi5kcad6i0cqpf.apps.googleusercontent.com',      
  //   });
  // })

  async function onGoogleButtonPress() {
    // try{
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    // }catch{
    //   console.log(error)
    // }
  }

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{flex:1}}
      >
    <SafeAreaView style={styles.container}>
      <AnimatableImage
        style={styles.vector1}
        source={require('../../assets/images/vector1.png')}
        useNativeDriver
        animation={animationLeft}
      />
      <AnimatableImage
        style={styles.vector2}
        source={require('../../assets/images/vector2.png')}
        useNativeDriver
        animation={animationRight}
      />
      <AnimatableImage
        style={styles.vector3}
        source={require('../../assets/images/vector3.png')}
        useNativeDriver
        animation={animationRight}
      />
      <AnimatableImage
        style={styles.vector4}
        source={require('../../assets/images/vector4.png')}
        useNativeDriver
        animation={animationRight}
      />
      
        <Text style={styles.heading}>Welcome Back!</Text>
        <View style={styles.btnWrapper}>
          <View style={styles.btnItemWrapper}>
            <SecondaryButton
              label={'CONTINUE WITH FACEBOOK'}
              background={colors.facebookBg}
              fontColor={colors.white}
              btnType="FACEBOOK"
            />
          </View>
          <View style={styles.btnItemWrapper}>
            <SecondaryButton
              label={'CONTINUE WITH GOOGLE'}
              background={colors.white}
              btnType="GOOGLE"
              fontColor={colors.heading}
            />
          </View>
        </View>
        <Text style={styles.or}>OR LOG IN WITH EMAIL</Text>
        <View style={styles.inputItem}>
          <PrimaryInput placeHolder={'Email Address'} />

        </View>
        <View style={styles.inputItem}>
          <PrimaryInput placeHolder={'Password'} />
        </View>
        <View style={styles.loginBtnWrapper}>
          <PrimaryButton onPress={() => {navigation.navigate("Home"); route.params.setLogedIn(true, {id:"adnane", fullName:"na9aro lkhachab"})}} label={'LOG IN'} />
        </View>        
      
      {/* <View style={styles.footerWrapper}>
        <Text style={styles.footerText}>
          <Text style={styles.footerText1}>ALREADY HAVE AN ACCOUNT?</Text>
          <Text style={styles.footerText2}>SIGN UP</Text>
        </Text>
      </View> */}
      
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login

export const styles = StyleSheet.create({
  container: {    
    justifyContent:'flex-end',
    flex: 1,
    padding: 20,
    backgroundColor:'#e2e4ed',

  },
  vector1: {
    position: 'absolute',
    left: -10,
    top: -5,
  },
  vector2: {
    position: 'absolute',
    right: -6,
  },
  vector3: {
    position: 'absolute',
    top: 90,
  },
  vector4: {
    position: 'absolute',
    right: 0,
    top: 90,
  },
  contentContainer: {
    flex: 1,
  },
  back: {
    marginTop: 50,
  },
  heading: {
    fontFamily: 'Poppins-ExtraLight',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 40,
    textAlign: 'center',
    color: colors.heading,
    flex:1,    
  },
  btnWrapper: {
    marginTop: 30,
  },
  btnItemWrapper: {
    marginBottom: 20,
  },
  or: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    fontFamily: 'Poppins-ExtraLight',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 30,
    color: colors.gray,
    flex:1,
  },
  inputItem: {
    marginBottom: 20,
    flex:1,
  },
  loginBtnWrapper: {
    marginTop: 10,
    flex:1,
  },
  forgotPassword: {
    fontFamily: 'Poppins-ExtraLight',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  footerText: {
    fontFamily: 'Poppins-ExtraLight',
    fontWeight: '400',
    fontSize: 14,
  },
  footerText1: {
    color: colors.gray,
  },
  footerText2: {
    color: colors.primary,
  },
  footerWrapper: {
    flex:1,
    position: 'absolute',
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});