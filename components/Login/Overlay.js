import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated';  
import {LOGIN_VIEW_HEIGHT, SCREEN_HEIGHT}  from "../../Constants"
import { interpolateColor } from 'react-native-redash/lib/module/v1';

const Logo = ({isOpenAnimation}) => {

    const translateY = interpolate(isOpenAnimation, {
        inputRange : [0,1],
        outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, -LOGIN_VIEW_HEIGHT / 2]
    })

    const backgroundColor = interpolateColor(isOpenAnimation, {
        inputRange : [0,0.1,1],
        outputRange : ["#2289d6", "#FFFF", "#FFFF"]
    })
    return(
        <Animated.View 
          style={{
            height:LOGIN_VIEW_HEIGHT,
            alignItems:"center",
            justifyContent: "center",
            backgroundColor,
            position:"absolute",
            top:0,
            left:0,
            right:0,            
            transform:[{translateY}]
          }}
        >          
        </Animated.View>
    )    
}

export default Logo;

const styles = StyleSheet.create({
    logo:{
        backgroundColor:'white',
        height:120,
        width:120,
        padding:10,
        alignItems:"center",
        justifyContent:'center',
    }    
})
