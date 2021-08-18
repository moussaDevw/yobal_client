
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useContext, useRef, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Touchable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {TouchableOpacity as MyTouchable} from 'react-native'
import { useState } from 'react';
import Slide from '../components/Lottie/Slide'
import {getProducts, validatePanier} from '../src/DataController'
import {prefix} from '../Constants'
import IconFeather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../navigation/AuthProvider';
import Modal from 'react-native-modal';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';

// Autocomplete Filter
const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());


const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const animation = {
  0 : {translateX: 400},
  1 : {translateX: 0}
}


/**************
*   Circle
**************/
const Circle = ({ scrollX, products }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {products.map(( item, index) => {
        const inputRange = [
          (index - 0.55) * width,
          index * width,
          (index + 0.55) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: '#9dcdfa',
                opacity,
                transform: [{ scale }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};


/**************
*   Ticker
**************/
const Ticker = ({ scrollX, products }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {products.map(({ name }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {name}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};


/**************
*   Item
**************/
const Item = ({ imageUri, price, description, index, scrollX, product, setPanier, setLoading, panier}) => {

  const [quantity, setQuantity] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)


  const toggleModal = (visibilty) => {
    setModalVisible(visibilty)
  }

  const plusQuantity = () => {
    setQuantity(quantity+1)
  }

  const minusQuantity = () => {
    if(quantity > 1){
      setQuantity(quantity - 1 )
    }
  }
  

  const choisirQuantity = () => {
    toggleModal(true)
  }

  const ajouterPanier = () => {
    // setLoading(true)
    let newPanier = panier;
    newPanier.push({...product, quantity: quantity})
    console.log('hahua new panier   ',newPanier)
    setPanier(newPanier)
    setModalVisible(false)
    // setTimeout(()=>{
    //   setLoading(false)
    // },500)

  }

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        // defaultSource={require('../assets/images/loading.png')}        
        source={{uri : prefix + 'shopimage/' + imageUri}}
        style={[
          styles.imageStyle,
          {
            transform: [{ scale }],
          },
        ]}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{ translateX: translateXHeading }],
            },
          ]}
        >
          {price+' FCFA'}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [
                {
                  translateX: translateXDescription,
                },
              ],
            },
          ]}
        >
          {description}          
        </Animated.Text>
        <View style={{alignItems:'center', justifyContent:'center', width:230,marginTop:35}}>
          <TouchableOpacity onPress={() => choisirQuantity()} style={[{borderRadius:20, backgroundColor:'#3b5998', padding:20, },styles.shadow]}>
            <Text style={{fontFamily:'Poppins-SemiBold', color:'white'}}>Ajouter au Panier</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Modal  isVisible={modalVisible} >
          <View style={{backgroundColor:'#FFF', borderRadius:20, alignItems: 'center', justifyContent: 'center',padding:60}}>            
            <Text style={{fontFamily:'Poppins-Bold', fontSize:20, textAlign:'center'}}>Choisir la quantité de ce produit</Text>            
            <View style={{flexDirection:'row', alignItems:'center'}}>                            
              <IconFeather onPress={minusQuantity} name='minus' size={20} />
              <View>
                <Text style={{fontFamily:'Poppins-Bold' ,fontSize:20, marginHorizontal:20}}>{quantity}</Text>
              </View>
              <IconFeather onPress={plusQuantity} name='plus' size={20} />
            </View>
            <View style={{flexDirection:'row',  justifyContent:'space-between'}}>   
              <MyTouchable style={styles.buttons} onPress={() => toggleModal(false)}>
                <Text style={{color:"#3b5998", fontFamily:'Poppins-Bold'}}>Fermer</Text>
              </MyTouchable>           
              <MyTouchable style={styles.buttons} onPress={ajouterPanier}>
                <Text  style={{color:"#3b5998",  fontFamily:'Poppins-Bold'}}>Valider</Text>
              </MyTouchable>
            </View>            
          </View>
        </Modal>    
    </View>
  );
};


/***************
*   Pagination
***************/
const Pagination = ({ scrollX, products, marketData }) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });
  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: 'absolute',
            // backgroundColor: 'red',
            transform: [{ translateX }],
          },
        ]}
      />
      {products.map((item) => {
        return (
          <View key={item.id} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, { backgroundColor: '#758ab6' }]}
            />
          </View>
        );
      })}
    </View>
  );
};


/****************
*   ProductItem
*****************/
const ProductItem = ({index, item, deleteItem}) => {

  return(
      <Animatable.View
          useNativeDriver
          animation={animation}
          delay={100 + (index+1) *100}
          key={index}
      >                        
          <View  style={[{padding:10, justifyContent: 'center',marginVertical:10,borderRadius:20, backgroundColor:'#FFF', }, styles.shadow]}>
              <View style={{flexDirection:'row', alignItems:'center' }}>
                <View>
                  <Image style={{width:90, height:90, resizeMode:'contain'}} source={{uri: prefix+ 'shopimage/' + item.imageUri}} />
                </View>

                <View style={{paddingLeft:6}}>
                      <Text style={{fontFamily:'Poppins-Bold', color:'#000'}}>{item.name}</Text>
                      <Text style={{fontFamily:'Poppins-Regular',}}>{item.description}</Text>
                  </View>
                </View>

                <View style={{padding:10}}>
                  <Text style={{fontFamily:'Poppins-Bold', fontSize:15}}>{'Quantité : '} <Text style={{color:'#000'}}>{item.quantity}</Text></Text>
                </View>       

                <View style={{padding:10, backgroundColor:'#d8d8d8', borderRadius:20, alignItems: 'center',}}>
                  <Text style={{fontFamily:'Poppins-Bold', fontSize:15}}>{item.price + ' FCFA'}</Text>
                </View>                             

                <View style={{flexDirection:'row-reverse'}}>
                  <TouchableOpacity onPress={() => deleteItem(index)} style={{padding:10}}>
                    <Image style={{width:30, height:30}} source={require('../assets/images/delete.png')} />
                  </TouchableOpacity>
                </View>
          </View>                            
      </Animatable.View>
  )
}


/**************
*   Panier
**************/
function Panier ({setSlide, products, panier, marketData, setPanier}) {

  const {chosenAdress, setSpinner} = useContext(AuthContext);

  const adressOfUser = chosenAdress.formattedAdress;
  const marketId = marketData.id

  const [modalVisible, setModalVisible] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)

  const totalHandler = () => {
    
    let totalAmount = 0
    
    panier.map((item, index) => {
      totalAmount = totalAmount + item.price * item.quantity
    })

    setTotalAmount(totalAmount)
    return(totalAmount) 
  }


  const toggleModal = (visibility) => {
    totalHandler()
    setModalVisible(visibility)    
  }

  const sendPanier = () => {    
    
    const prixTotal  = totalHandler()
    
    const panierData = {
      totalAmount: prixTotal, 
      amountWay: 'online',
      deliveryAmount: 12,
      shopId: marketId,
      adressId: adressOfUser.id,
      orderProducts: panier,      
    }

    // console.log(panierData)
    validatePanier(panierData, setSpinner)
    setSlide(0)
  }
  
  

  const deleteItem = (deletedItem) => {
    
    let newPanier = panier;
    console.log(newPanier)
    newPanier.splice(deletedItem, 1)
    console.log(newPanier)
    setPanier(newPanier)
    setSlide(0)
  }

  return(
    <View style={styles.container}>
      <IconFeather 
          name='arrow-left'
          size={28}
          style={{
              position:'absolute',
              top: 20*2,
              right:10,
              zIndex:2,              
          }}
          color={"#333"}
          onPress={()=>{
              setSlide(0);
          }}
      />  
      <ScrollView>
        <View style={{padding:20, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{fontFamily:'Poppins-Bold', fontSize:20}}>Votre Panier</Text>
        </View>

        <View style={{padding:10}}>
          {panier.map((item, index)=> (
                <ProductItem item={item} index={index} deleteItem={deleteItem} />
            ))               
          }
        </View>   

        {panier.length !== 0 && <View style={{alignItems:"center", justifyContent: 'center',}}>
          <TouchableOpacity onPress={() => toggleModal(true)} style={[{alignItems:'center', justifyContent: 'center', padding:20, backgroundColor:'#758ab6', borderRadius:20, marginBottom:20}, styles.shadow]}>
            <Text style={{color:'#FFF', fontFamily:'Poppins-Bold'}}>Valider Panier</Text>
          </TouchableOpacity>
        </View>}
        
      </ScrollView>

      <Modal  isVisible={modalVisible} >
          <View style={{backgroundColor:'#FFF', borderRadius:20, alignItems: 'center', justifyContent: 'center',padding:20}}>            
            <Image  source={require('../assets/images/money.png')} />
            <Text style={{fontFamily:'Poppins-Bold', fontSize:20, textAlign:'center', color:'rgba(0,0,0,0.6)'}}>Le total de votre demande est : </Text>    
            <Text style={{fontFamily:'Poppins-Bold', fontSize:20, textAlign:'center', color:'#000'}}>{totalAmount + ' FCFA'}</Text>            
            <View style={{flexDirection:'row',  justifyContent:'space-between'}}>   
              <MyTouchable style={styles.buttons} onPress={() => toggleModal(false)} >
                <Text style={{color:"#3b5998", fontFamily:'Poppins-Bold'}}>Fermer</Text>
              </MyTouchable>           
              <MyTouchable style={styles.buttons} onPress={() => sendPanier()} >
                <Text  style={{color:"#3b5998",  fontFamily:'Poppins-Bold'}}>Valider</Text>
              </MyTouchable>
            </View>            
          </View>
        </Modal>  

    </View>
  )
}


/***********************
*   Food Menu Component
************************/
function FoodMenuComponent({navigation, products, setSlide, setPanier, panier}) {

  const scrollX = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false)

  // Scroll to the item when press on it
  const ref = useRef()
  const onItemPress = useCallback(itemIndex => {
    ref.current.scrollToOffset({
      offset: itemIndex * width
    })
  })

  // For Autocomplete
  const [value, setValue] = useState(null);
  const [data, setData] = useState(products);

  const onSelect = (index) => {
    setValue(products[index].name);
    onItemPress(index)
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(products.filter(item => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.name}
    />
  );
  {/* End Autocomplete */}
  
  if(loading){
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Slide source={require("../assets/json/check.json")}/>
        <Text style={{fontFamily:'Poppins-Bold', marginTop:40, fontSize:25}}>Produit Ajouté Au Panier</Text>
      </View>
    )
  }  
  else{
    return (
      <View style={styles.container}>
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

        {/* Autocomplete */}
        <View style={{
          position: 'absolute',
          top: 33,
          left: 30,
          width: "80%",
          zIndex: 1
        }}>
        <Autocomplete
          placeholder='Choose a dish'
          value={value}
          onSelect={onSelect}
          onChangeText={onChangeText}>
          {data.map(renderOption)}
        </Autocomplete>
        </View>
        {/* End Autocomplete */}

        <MyTouchable onPress={() => setSlide(1)} style={[{padding:20, borderTopLeftRadius:20,borderBottomLeftRadius:20, backgroundColor:'#758ab6', position: 'absolute', bottom:290, right:-10, zIndex:99, flexDirection:'row', alignItems: 'center' }, styles.shadow]}>
          <IconFeather color='#FFF' size={20} name='shopping-cart' />
          <Text style={{fontFamily:'Poppins-Medium', color: '#FFF'}}>  Votre Panier</Text>
        </MyTouchable>     

        <StatusBar style='auto' hidden />
        <Circle products={products} scrollX={scrollX} />


        <Animated.FlatList
          ref={ref}
          keyExtractor={(item) => item.id}
          data={products}
          renderItem={({ item, index }) => (
            <Item panier={panier} loading={loading} setLoading={setLoading} {...item} product={item} index={index} scrollX={scrollX} setPanier={setPanier} />
          )}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
        

        
        <Pagination products={products} scrollX={scrollX} />
        <Ticker products={products} scrollX={scrollX} />    
      </View>
    );
  }
}


/**************
*   Food Menu
**************/
const FoodMenu = ({navigation, route}) => {

  // console.log('thats market object', route)
  const [products, setProducts] = useState(null);
  const [slide, setSlide] = useState(0);
  const [panier, setPanier] = useState([])


  const marketData = route.params.marketItem;
  const marketId = marketData.id;

  // Events to run whenever you navigate to this screen
  useEffect(() => {        
      const unsubscribe = navigation.addListener('focus', () => {      
          getProducts(setProducts, marketId)
      });      
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;

  }, [navigation]);    

  if(products){
    return(
      <>
        {slide === 0 && <FoodMenuComponent panier={panier} setPanier={setPanier} setSlide={setSlide} products={products} navigation={navigation} />}             
        {slide === 1 && <Panier marketData={marketData} setPanier={setPanier} panier={panier} products={products} setSlide={setSlide} navigation={navigation} />}             
      </> 
    )
  }

  else{
    return(
      <View style={{flex:1, alignItems:'center', justifyContent: 'center',}}>
        <ActivityIndicator size={'large'} color='#758ab6' />
      </View>
    )    
  }
  
}

export default FoodMenu
























































const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
    flex: 1,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
  },
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    fontFamily:'Poppins-Bold',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'left',
    fontFamily:'Poppins-SemiBold',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: '-90deg' },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  tickerContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT-4,
    lineHeight: TICKER_HEIGHT,
    // textTransform: 'uppercase',
    fontFamily:'Poppins-Regular',
    fontWeight: '800',
  },

  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 9,
},
buttons:{
  padding:20,
  backgroundColor:'#FFF',
  borderRadius:20  
}
});
