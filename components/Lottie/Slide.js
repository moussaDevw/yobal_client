import React from 'react';
import LottieView from 'lottie-react-native';
import {Text , View} from "react-native"

export default class Slide extends React.Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
              
         <LottieView
            style={{
                width: 180,
                height: 180,
                backgroundColor: 'transparent',
                paddingTop:4
            }}

            source={this.props.source}
            colorFilters={[{
            keypath: "button",
            color: "#F00000"
            },{
            keypath: "Sending Loader",
            color: "#F00000"
            }]}
            autoPlay
            loop
        />       
     
    );
  }
}