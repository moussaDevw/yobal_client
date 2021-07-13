import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image , StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import {buttons} from '../Data/brands';
import RowButton from '../components/RowButton';
import * as Animatable from 'react-native-animatable';
import {prefix} from '../Constants'


const animation = {
    0 : {opacity : 0, translateX: 50},
    1 : {opacity : 1, translateX: 0}
}

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

const BrandDetails = ({navigation, route}) => {
    const {item} = route.params;


    return(
        <SafeAreaView style={{flex:1}}>
            <AntDesign 
                name='close'
                size={28}
                style={{
                    position:'absolute',
                    top: 20*2,
                    right:10,
                    zIndex:2
                }}
                color={"#333"}
                onPress={()=>{
                    navigation.goBack();
                }}
            />
            <View style={styles.image} >
                <Image source={{uri: prefix+item.logo}} style={[{flex:1,width:width,height:width,resizeMode:'contain'}]} />
            </View>
            <View style={styles.meta} >
                    <View id={`item.${item.key}.model`}>
                        <Text style={styles.model}>{item.name}</Text>
                    </View>                        
            </View>
            <View style={{positio:'absolute', top:height/2}}>
                {buttons.map((text, index)=> {
                    return <Animatable.View
                                useNativeDriver
                                animation={animation}
                                delay={300 + (index+1) *100}
                                key={index}
                            >
                            <RowButton marketItem={item} navigation={navigation} text={text}/>
                        </Animatable.View>
                })}
            </View>           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image:{
        width : width,
        height: (width/2)*1.2,
        resizeMode:'contain',
        position:'absolute',
        top:"16%"
    },
    meta:{
        position:'absolute',
        top:  20 * 4,
        left: 20, 
        width: width *0.6

    },
    model:{
        fontSize:25,
        fontWeight: '800',
        fontFamily:'Poppins-Bold',
        position:'absolute',
        // top:(height/2)
        
    },
    description:{
        fontSize:12,
        opacity:0.7,
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: -99999,
    },

})

export default BrandDetails 