import React from 'react';
// import BubbleSelect, { Bubble } from 'react-native-bubble-select';
import { Dimensions, Text } from 'react-native';
import { View } from 'native-base';
import { AnimatedCircles } from "../AnimatedCircles/AnimatedCircles.component";
import Draggable from 'react-native-draggable';
const { width, height } = Dimensions.get('window');

const App = () => {
    
  return (
    // <Draggable x={75} y={100} renderSize={56} renderColor='black' renderText='A' isCircle shouldReverse onShortPressRelease={()=>alert('touched!!')}/> 
    
      <AnimatedCircles />
    // </View>    
    // <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
    //   <Text>Hello</Text>
    //   <BubbleSelect
    //     onSelect={bubble => console.log('Selected: ', bubble.id)}
    //     onDeselect={bubble => console.log('Deselected: ', bubble.id)}
    //     width={width}
    //     height={height}
        
    //   >
    //     <Bubble style={{backgroundColor: 'green',}} animationDuration={0.2}  id="bubble-1" text="Bubble Three" />
    //     {/* <Bubble animationDuration={0.2} color='green' id="bubble-2" text="Bubble Three" />
    //     <Bubble animationDuration={0.2} color='black' id="bubble-3" text="Bubble Three" />
    //     <Bubble animationDuration={0.2} color='red' id="bubble-4" text="Bubble Three" /> */}
    //     {/* <Bubble animationDuration={0.2} color='red' id="bubble-3" text="Bubble Three" />
    //     <Bubble animationDuration={0.2} color='red' id="bubble-3" text="Bubble Three" />
    //     <Bubble animationDuration={0.2} color='red' id="bubble-3" text="Bubble Three" /> */}
        
    //   </BubbleSelect>

    // </View>
      

  );
};

export default App