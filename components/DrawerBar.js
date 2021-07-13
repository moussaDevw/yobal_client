import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class DrawerBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{flex:1, alignItems:'center',justifyContent: 'center',backgroundColor:'white'}}>
            <Text style={{fontFamily:'Poppins-ExtraLight'}}>Account Config</Text>
        </View>
    );
  }
}
