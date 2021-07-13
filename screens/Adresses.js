import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Touchable, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../navigation/AuthProvider';
import { Radio, RadioGroup } from '@ui-kitten/components';


const Adresses = ({navigation}) => {

    const {userAdress, chosenAdress, setChosenAdress} = useContext(AuthContext);
    const listeAdresses = userAdress.adresses;
    const [selectedIndex, setSelectedIndex] = useState(chosenAdress.index);

    const adressHandler = (index) => {
        setSelectedIndex(index);
        setChosenAdress({
            formattedAdress : listeAdresses[index],
            index: index
        })        
    }

    return(
        <ScrollView>
            <View style={{height:100}}>
                <View style={{flex:1, flexDirection:'row',alignItems: 'flex-end',padding:10, justifyContent: 'center',}}>
                    <Icon onPress={() => navigation.goBack()} name='arrow-left' size={30} style={{position:'absolute', top:56, left:20, color:'#3b5998'}} />
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:25, color:'#3b5998'}}>Liste des adresses</Text>
                </View>
            </View>
            <View style={{padding:20}}>
                <RadioGroup
                    selectedIndex={selectedIndex}
                    onChange={index => adressHandler(index)}>
                    {listeAdresses.map((item, index) => (
                        
                        <Radio style={[{alignItems: 'center', marginBottom:10, backgroundColor:'#FFF', borderRadius:20, height:80, padding:20}, styles.shadow]}>                            
                            
                                <Text style={{fontFamily:'Poppins-Bold', fontSize:16, color:'#293e6a'}} >{item.streetName}</Text>
                            
                        </Radio>                        
                    ))}
                    
                </RadioGroup>
            </View>
        </ScrollView>
    )
}

export default Adresses

const styles = StyleSheet.create({
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})