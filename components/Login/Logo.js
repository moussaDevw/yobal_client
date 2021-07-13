import React,{useRef, useEffect} from 'react'
import { Text, View, StyleSheet,Image} from 'react-native'
import { ease } from 'react-native/Libraries/Animated/src/Easing';
import Animated, {Easing} from 'react-native-reanimated';

const Logo = ({scale}) => {

    const opacityIn = useRef(new Animated.Value(0)).current
    useEffect(()=> {
      Animated.timing(opacityIn, {
        toValue: 1,
        duration:500,
        easing:Easing.ease
      }).start();
    })

    return(
        <Animated.View style={{...styles.logo,opacity:opacityIn, transform:[{scale: scale}]}}>        
            <Image style={{width:400,height:400, resizeMode:'contain'}} source={require('../../assets/images/PeliaLogo.png')}/>
        </Animated.View>
    )    
}

export default Logo;

const styles = StyleSheet.create({
    logo:{
        
        height:120,
        width:120,
        padding:10,
        alignItems:"center",
        justifyContent:'center',
        // borderRadius:10
    }    
})
