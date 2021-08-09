import React, {useEffect, useContext, useState} from 'react';
import { View, Text, SafeAreaView, StatusBar,StyleSheet, FlatList, Image, ActivityIndicator, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import {getMarkets} from '../src/DataController'
import {AuthContext} from '../navigation/AuthProvider'
import {prefix} from '../Constants'
import Slide from '../components/Lottie/Slide'
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';


const BrandItem = ({navigation, item}) => {
    
    return(
        <TouchableOpacity onPress={() => navigation.push('BrandDetails',{item})} >                            
            <View style={[styles.item,]}>
                <View style={{flex:1, }}>
                    <View style={{flex:1,justifyContent: 'center',}}>
                        <Text style={styles.model}>{item.name}</Text>
                    </View>
                    <View style={{flex:1, justifyContent: 'center',}}>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                </View>
                <View style={[styles.image, {flex:1}]} >
                    <Image  source={{uri: prefix+item.logo}} style={[{flex:1, width:270, height:270,resizeMode:'contain',opacity:0.9}]}/>
                </View>                                
            </View>                  
        </TouchableOpacity>
    )
}

// Autocomplete Filter    
const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());

const BrandList = ({navigation, route}) =>  {

    const {chosenAdress} = useContext(AuthContext);  
    const userAdress = chosenAdress.formattedAdress;
    const categoryItem = route.params.categoryItem;

    const [brandsList, setBrandsList] = useState(null);
    const [emptyList, setEmptyList] = useState(false)


    const [value, setValue] = useState(null);
    const [data, setData] = useState(brandsList);

    // Do Action On Select item 
    const onSelect = (index) => {
        setValue(brandsList[index].name);
    };

    // Do Action On Change item
    const onChangeText = (query) => {
        setValue(query);
        setData(brandsList.filter(item => filter(item, query)));
    };

    const renderOption = ({item, index}) => (
        <AutocompleteItem
            key={index}
            title={item.name}
        />
    );

    // Events to run whenever you navigate to this screen
    useEffect(() => {        
        const unsubscribe = navigation.addListener('focus', () => {      
            getMarkets(setBrandsList, categoryItem, userAdress, setEmptyList)
        });
        

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;

    }, [navigation]);    
    
    if(emptyList){
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{fontFamily:'Poppins-Bold'}}>La Liste est Vide</Text>
                <Slide source={require('../assets/json/empty.json')} />
            </View>
        )
    }
    else{
        return(
            <SafeAreaView style={{flex:1}} >
                <AntDesign
                    hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
                    onPress={() => navigation.openDrawer()}
                    name='menufold'
                    size={32}
                    color='#222'
                    style={{position: 'absolute', top: 20, right: 0, padding: 20,zIndex:99999 }}
                />
                <AntDesign
                    hitSlop={{ left: 20, right: 20, top: 10, bottom: 10 }}
                    onPress={() => navigation.goBack()}
                    name='arrowleft'
                    size={32}
                    color='#222'
                    style={{position: 'absolute', top: 20, left: 0, padding: 20,zIndex:99999 }}
                />

                <StatusBar hidden />

                {/* Add by ilyass.net */}
                <View style={{marginTop: 90, paddingRight: 20, paddingLeft: 20}}>
                <Autocomplete
                    placeholder='Type name of restaurant ...'
                    value={value}
                    onSelect={onSelect}
                    onChangeText={onChangeText}>

                    {/* {data.map(renderOption)} */}
                    <FlatList 
                        data={data}
                        renderItem={renderOption}
                    />

                </Autocomplete>
                </View>

                
                {/* Rendering list of restaurants */}
                {brandsList ? 
                <FlatList
                    // style={{marginTop:20}}
                    contentContainerStyle={{padding:20}}
                    data={data ? data : brandsList}
                    keyExtractor={item => item.key}
                    renderItem={({item})=>{
                        return(
                            <BrandItem  item={item} navigation={navigation} />
                        )                    
                    }}
                /> 
                :
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><ActivityIndicator size="large" color="#758ab6" /></View>
                }

            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    item:{
        height:150,
        borderRadius:12,
        marginBottom:20,
        padding:20,
        backgroundColor:'#FFF',
        flexDirection:'row'
    },
    model:{
        fontSize:25,
        fontWeight: '800',
        fontFamily:'Poppins-Bold',        
    },
    description:{
        fontSize:12,
        opacity:0.7,
        fontFamily:'Poppins-SemiBold',
        // marginTop:20,
        flex:1

    },
    // image:{
    //     height: 150,
    //     width:'100%',        
    //     // position:'absolute',        
    //     // bottom:0,
    //     // right: '-40%'
    // },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        zIndex: 0,
    },

})

export default BrandList