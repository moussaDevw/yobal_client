import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Parametres extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
        <Text style={{fontFamily:'Poppins-ExtraLight'}} > Parametres </Text>
      </View>
    );
  }
}
