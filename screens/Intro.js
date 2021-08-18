import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions,FlatList, Pressable  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { interpolate } from 'react-native-reanimated';
import Slide from '../components/Lottie/Slide'
const {width, height} = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312


const bgs = ['#3e5697', '#3e5697', '#3e5697'];
const DATA = [
  {
    "key": "3571572",
    "title": "Commendez ce que vous voulez",
    "description": "Sachez à tout moment où se trouve votre commande, du restaurant à votre porte",
    "source": require('../assets/json/order_on_app.json')
  },
  {
    "key": "3571747",
    "title": "Suivez vos commandes en temps réel!",
    "description": "Sachez à tout moment où se trouve votre commande, du restaurant à votre porte",
    "source": require('../assets/json/tack_orders.json')
  },
  {
    "key": "3571603",
    "title": "Recevez vos articles sur le champs",
    "description": "Livraison ultra-rapide. Profitez de la garantie de qualité à 100% de Yobal sur chaque commande.",
    "source": require('../assets/json/order-completed.json')
  }
]


const LoginButton = ({navigation}) =>{
  
  return(
    <View style={{position: 'relative', top: 72, right: -130}}>
      <TouchableOpacity
          onPress={()=>navigation.navigate('LoginScreen')}         
      >
          <View style={{width:130, height:75}}>
              <View
                  style={{flex:1, alignItems:'center', justifyContent: 'center',borderRadius:20,flexDirection:'row'}}           
              >                               
                <Text style={{fontFamily:'Poppins-Regular',fontSize:17, color: '#FFF', fontWeight: '300'}}>{"Login  "}</Text>             
                <Icon size={20} name='right' color='#FFF'/>            
              </View>
          </View>            
      </TouchableOpacity>
  </View>    
  )
}
const Indicator = ({scrollX}) => {
  return( 
  <View style={{position:'absolute', bottom:50 ,flexDirection:'row'}}>
    {DATA.map((_, i)=>{
      const inputRange =  [(i-1) * width, i * width, (i+1) * width ];
      const scale = scrollX.interpolate({
        inputRange,
        outputRange:[0.6, 1.4, 0.6],
        extrapolate: 'clamp'
      })
      return <Animated.View 
        key={`indicator-${i}`}
        style={{
          width:10,
          height:10,
          borderRadius:5,
          backgroundColor:'#fff',
          margin:10,
          transform:[
            {
              scale,
            }            
          ]
        }}
      />
    })}
  </View>
  )
}

const BackDrop = ({scrollX}) => {  
  const backgroundColor = scrollX.interpolate({
    inputRange : bgs.map((_,i) => i * width),
    outputRange: bgs.map((bg)=> bg)
  })
  return <Animated.View 
    style={[{backgroundColor},StyleSheet.absoluteFillObject]}
  />
}

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX,width), new Animated.Value(width)),1
  );
  const rotate = YOLO.interpolate({
    inputRange:[0, 0.5, 1],
    outputRange:['35deg', '0deg', "35deg"]
  })

  const translateX = YOLO.interpolate({
    inputRange:[0, 0.5, 1],
    outputRange:[0, -height, 0]
  })
  return(
    <Animated.View
      style={{
        height:height,
        width:height,
        backgroundColor:"#FFF",
        borderRadius:86,
        position:'absolute',
        top:-height * 0.6,
        left:-height * 0.3,
        transform:[
          {
            rotate          
          },
          {
            translateX
          }
        ]
      }}
    />
  )
}

export default function Intro({navigation}) {
  const scrollX = React.useRef(new Animated.Value(0)).current
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX}/>
      <Animated.FlatList
        scrollEventThrottle={32}
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        contentContainerStyle={{paddingBottom:100}}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset:{x: scrollX}}}],
          {useNativeDriver:false}
        )}
        renderItem={({item,index})=>{
          return(
            <View style={{width, alignItems:'center', padding:20}}>
              <View style={{flex:0.7,justifyContent:'center'}}>
                {/* {(index !== 3 && index !== 2) && <Image source={{uri:item.image}} style={{width:width/2, height:height/2, resizeMode:'contain'}}/>}     */}
                <Slide source={item.source}/>                
              </View> 
              <View style={{flex:.2}}>
                <Text style={{color:"#FFF",fontWeight:'800',fontSize:28, marginTop:20, marginBottom:10,fontFamily:'Poppins-ExtraLight'}} >{item.title}</Text>
                <Text style={{fontWeight:'300', color:"#FFF",fontFamily:'Poppins-Regular'}} >{item.description}</Text>
              </View>  
              <View style={{flex:.1}}>
                {index === 2 && <LoginButton navigation={navigation} />}
              </View>              
            </View>
          )
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
}
});