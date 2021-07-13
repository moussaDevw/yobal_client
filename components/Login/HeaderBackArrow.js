import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated';  
import {Ionicons as Icon} from "@expo/vector-icons"
import { TapGestureHandler } from 'react-native-gesture-handler';

const HeaderBackArrow = ({isOpenAnimation, gestureHandler}) => {

    const opacityArrow = interpolate(isOpenAnimation, {
        inputRange : [0, 0.7, 1],
        outputRange : [0, 0, 1]
    })

    return(
        <TapGestureHandler {...gestureHandler} >
            <Animated.View style={{...styles.backArrow, opacity:opacityArrow}}>
                <Icon name="md-arrow-back" size={24}/>
            </Animated.View>
        </TapGestureHandler>        
    )    
}

export default HeaderBackArrow;

const styles = StyleSheet.create({
    backArrow:{
        position:'absolute',
        height:90,
        width:90,
        top:60,
        left:25,
        zIndex:100
    }    
})
