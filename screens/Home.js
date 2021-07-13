import React,
{useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import Promos from "../Data/Promos"
import * as Animatable from 'react-native-animatable';
import { SwipeablePanel } from 'rn-swipeable-panel';
import {AuthContext} from '../navigation/AuthProvider'
import {getCategories} from '../src/DataController'
import {prefix} from '../Constants'


const animation = {
    0 : {translateX: 50},
    1 : {translateX: 0}
}

const viewAnimation = {
    0 : {translateX: -50},
    1 : {translateX: 0}
}


 const  Home = ({navigation}) => {    

    const {logout, userAdress, user} = useContext(AuthContext);  

    const [categoryOne, setCategoryOne] = useState(null)
    const [categoryTwo, setCategoryTwo] = useState(null)
    
    const fullName = user.user.fullName
    // Events to run whenever you navigate to this screen
    useEffect(() => {
    
        const unsubscribe = navigation.addListener('focus', () => {      
            getCategories(setCategoryOne, setCategoryTwo)            
        });
        

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    
    }, [navigation]);    

    // Events to run when youre in this screen with condition not with navigation

    useEffect(() => {
        getCategories(setCategoryOne, setCategoryTwo)
    }, [navigation])

    const [isPanelActive, setIsPanelActive] = useState(false);

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => setIsPanelActive(false),
        // ...or any prop you want
    });

    
    const openPanel = () => {
        setIsPanelActive(true);
    };
    
    const closePanel = () => {
        setIsPanelActive(false);
    };

    const navigateHandler = (index) =>{
        if(index === 0 || index === 1 ){
            openPanel()
        }
        else{
            navigation.navigate('Map')
        }
    }

    const OptionItem = ({source, bgColor, label, onPress}) => {
        return(
            <TouchableOpacity
                style={{flex:1,alignItems:'center', justifyContent: 'center'}}
                onPress={onPress}
            >
                <View style={[styles.shadow,{width:115, height:130}]}>
                    <LinearGradient
                        style={{flex:1, alignItems:'center', justifyContent: 'center',borderRadius:20}}
                        colors={["#FFF","#FFF"]}
                        start={{x:0, y:0}}
                        end={{x:0, y:1}}
                    >                                            
                      <Image style={{width:100, height:100, resizeMode:'contain'}} source={source} />
                      <Text style={{fontFamily:'Poppins-Regular'}}>{label}</Text>
                    </LinearGradient>
                </View>            
            </TouchableOpacity>
        )
    }


    return (
      <SafeAreaView style={styles.container}>

         <AntDesign
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            onPress={() => navigation.openDrawer()}
            name='menufold'
            size={32}
            color='#222'
            style={{position: 'absolute', top: 20, right: 0, padding: 20,zIndex:99999 }}
        />
             <Animatable.View 
                style={{flex:1, width:'90%', marginTop:10}}
                useNativeDriver
                animation={viewAnimation}
            >
                <ImageBackground 
                    source={require('../assets/images/food.jpg')}
                    style={{
                        resizeMode:'cover',
                        width:"100%",
                        height:"100%",  
                        borderRadius:70,
                        overflow:'hidden',                        
                    }}
                >
                    <View 
                        style={styles.overlay}                        
                    />
                    <View style={{flex:1,alignItems:"center", justifyContent:'center'}} >
                        <Text style={{fontFamily:'Poppins-SemiBold', fontSize:15, color: '#000'}} >Bonjour,{<Text style={{fontSize:25,color:'#000'}} > {fullName}</Text>}</Text>
                        <Text style={{fontFamily:'Poppins-SemiBold', fontSize:15, color: '#000'}} >Que voulez vous faire ajourd'hui !</Text>
                    </View>                                            
                </ImageBackground>
            </Animatable.View>
            {/* {Options} */}
            <View style={[{flex:3,  justifyContent: 'center', width:'98%',borderRadius:20, padding:10, marginVertical:20,backgroundColor:'#FFF', borderRadius:20}]}>            
              <Text style={{fontFamily:'Poppins-Bold', fontSize:20}}>Catégories : </Text>
                <Animatable.View
                    style={{flexDirection: 'row',paddingTop:20}}
                    useNativeDriver
                    animation={animation}                    
                >
                    {categoryOne ? categoryOne.map((item, index) => (
                        <OptionItem
                            icon={'video'}
                            bgColor={['#46aeff', '#5884ff']}
                            source={{uri:`${prefix+item.icon}`}}
                            label={item.name}
                            onPress={() => {navigation.push('BrandList',{categoryItem: item})}}
                        />
                    )): null}
                </Animatable.View>
                <Animatable.View 
                    style={{paddingTop:10,flexDirection: 'row'}}                    
                    useNativeDriver
                    animation={viewAnimation}
                >
                    {categoryTwo ? categoryTwo.map((item, index) => (
                        <OptionItem
                            icon={'video'}
                            bgColor={['#46aeff', '#5884ff']}
                            source={{uri:`${prefix+item.icon}`}}
                            label={item.name}
                            onPress={() => {navigation.push('BrandList',{categoryItem: item})}}
                        />
                    )) : null}
                </Animatable.View>
            

            </View>

            <View style={{flex:2,alignItems: 'center',justifyContent:'center', flexDirection:'row', width:"90%" }}>              
                  {Promos.map((item, index)=> (
                    <Animatable.View 
                        style={{flex:1,alignItems:'center', justifyContent: 'center',borderRadius:50}}
                        useNativeDriver
                        animation={animation}
                        delay={30 + (index+1) *100}
                        key={index}                    
                    >
                        <TouchableOpacity style={[styles.shadow, {borderRadius:20, backgroundColor:'#FFF'}]} onPress={() => navigateHandler(index)}>
                            <View style={[{borderRadius:50, height:100, width:100, alignItems: 'center', justifyContent: 'center',}]}>                                                
                                <Image style={{width:60, height:60, resizeMode:'contain'}} source={item.source} />
                                <Text style={{fontFamily:'Poppins-Regular', fontSize:12, textAlign:'center'}}>{item.title}</Text>                            
                            </View>                                    
                        </TouchableOpacity>
                    </Animatable.View>
                  ))}
            </View>
            
            <SwipeablePanel {...panelProps} isActive={isPanelActive} style={{elevation:5}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', elevation:5}}>
                    <View style={{flex:1}}>
                        <Text style={{fontFamily:'Poppins-ExtraLight'}}>Promos List</Text>
                    </View>               
                    <View style={{flex:1,marginTop:80, alignItems: 'center', justifyContent: 'center',}}>
                        <Image style={{width:100, height:100}} source={require("../assets/images/empty.png")} />
                        <Text style={{fontFamily:'Poppins-SemiBold', marginTop:40}}>Y'a aucune promotions pour l'instant</Text>
                    </View>                         
                </View>                
            </SwipeablePanel>
      </SafeAreaView>
    );
  
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
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
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
      }
})

export default Home;