import React from "react";
import Animated from "react-native-reanimated";
import {Text} from 'react-native'
import Draggable from 'react-native-draggable';
import { View } from "native-base";

export const circleDiameter = 128;
const circleRadius = circleDiameter / 2;

export const Circle = ({ translateX, translateY }) => {
  return (
    // <View style={{textAlign:'center',justifyContent:'center',alignItems: 'center',}}>
    //   {/* <Animated.View style={{translatransform: [{ translateX }, { translateY }]}}> */}
    // <Draggable moveX={translateX} moveY={translateY} animatedViewProps={{ accessibilityHint: 'drag'}} style={{flex:1,justifyContent:'center' }} renderSize={156} renderColor='black' renderText='A'  shouldReverse onShortPressRelease={()=>alert('touched!!')}> 
    <Animated.View
      style={{
        alignItems: 'center',
        justifyContent:'center',
        transform: [{ translateX }, { translateY }],
        position: "absolute",
        width: circleDiameter,
        height: circleDiameter,
        borderRadius: circleRadius,
        backgroundColor: "#ff0000"
      }}
    >
      <Text style={{fontFamily:'Poppins-ExtraLight'}} >Hello</Text>
    </Animated.View>
    // </Draggable>
    //   {/* </Animated.View> */}
          
    // {/* </View> */}

  );
};
