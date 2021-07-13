import React from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import {colors} from './colors';

export const PrimaryInput = (props) => {
  const {placeHolder, isValid, value} = props;
  return (
    <View style={styles.container}>
      <TextInput value={value} style={styles.input} placeholder={placeHolder} />
      <View style={styles.validityShowWrapper}>
        {isValid ? (
          <Image source={require('../../assets/images/checked.png')} />
        ) : null}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: "#d2d6e4",
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'HelveticaNeue',
  },
  input: {
    padding: 20,
    fontSize: 16,
    color:'#000',
    width:"100%",
    fontFamily:'Poppins-Regular'
  },
  validityShowWrapper: {
    marginRight: 15,
  },
});