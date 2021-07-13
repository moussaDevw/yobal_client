import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import {getCommandes} from '../src/DataController';
import {AuthContext} from '../navigation/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';


const CommandItem = ({item}) => {

    const date = new Date(item.createdAt)
    const localeDate = date.toLocaleDateString()
    const localeTime = date.toLocaleTimeString()
    const paid = item.payed;

    return(
        <TouchableOpacity style={[{borderRadius: 20, backgroundColor:'#FFF', padding:20,  marginVertical:10, height:100, width:350, overflow:'hidden',}, styles.shadow]}>
            <View>
                <Text style={{fontFamily:'Poppins-Bold'}}>{localeDate}</Text>
                <Text style={{fontFamily:'Poppins-Bold'}}>{localeTime}</Text>
            </View>

            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={{transform: [{ rotate: '-60deg'}], position:'absolute', right:-100, top:-100, height:300, width:300}}/>                                

            <Image style={{width:50, height:50, position:'absolute', right:20, top:20}} source={paid ? require('../assets/images/paid.png') : require('../assets/images/notpaid.png')} />
           
        </TouchableOpacity>
    )
}
const CommandesList = ({commandes}) => {    

    const commandes_list = commandes.orders
    return(
        <View>
            {commandes_list.map((item, index) => (
                <CommandItem  item={item}/>
            ))}
        </View>

    )
}

const Commandes = () => {

    const [commandes, setCommandes] = useState(null)

    const {setSpinner} = useContext(AuthContext)

    useEffect(() => {
        getCommandes(setSpinner, setCommandes)
    }, [])

    return(
        <ScrollView contentContainerStyle={{alignItems:'center', justifyContent: 'center',}} >
            {commandes ? <CommandesList commandes={commandes} /> : <ActivityIndicator size={'large'} color={'#3b5998'} />}
        </ScrollView>
        
    )
}

export default Commandes

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