import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

const RowButton = ({text, key, navigation , marketItem}) => {
    return(
        <TouchableOpacity key={key} onPress={() =>navigation.navigate('FoodMenu', {marketItem}) } >
            <View
                style={{
                    flexDirection:'row',
                    padding: 20 * 2,
                    justifyContent: 'space-between',
                    borderColor: 'rgba(0,0,0,0.1)',
                    // borderBottomWidth: 1,
                    borderTopWidth  :1

                }}
            >
                <Text style={{fontSize:18,fontFamily:'Poppins-Regular'}}>{text}</Text>
                <AntDesign
                    name='arrowright'
                    color='rgba(0,0,0,0.8)'
                    size={25}
                />                
            </View>
        </TouchableOpacity>
    )
}

export default RowButton
