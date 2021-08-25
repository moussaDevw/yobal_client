
import React, {useContext} from 'react';
import {
  StatusBar,
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import Svg, { Polygon } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import MaskedView from '@react-native-community/masked-view';
import { colors, links } from '../../utils';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import {AuthContext} from '../../navigation/AuthProvider'
import {Colors} from '../../Constants'
import IconFeather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedMaskedView = Animated.createAnimatedComponent(MaskedView);

const { width, height } = Dimensions.get('window');
const fromCoords = { x: 0, y: height };
const toCoords = { x: width, y: 0 };

const Button = ({ title, onPress, style,index }) => {
    if(index == 0){
      var iconName = 'home'
    }    
    else if(index == 1){
      var iconName = 'user'
    }
    else if(index == 2){
      var iconName = 'book-open'
    }
    else if(index == 3){
      var iconName = 'share-2'
    }
    else if(index == 4){
      var iconName = 'settings'
    }
    else if(index == 5){
      var iconName = 'user-plus'
    }
    else if(index == 8){
      var iconName = 'log-out'
    }

  return (    
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={{flexDirection:'row', alignItems:'center'}}>
      <IconFeather style={{paddingRight:20, color: '#3b5998'}} size={30} name={iconName} />
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function CustomDrawer({ navigation, selectedRoute, routes }) {
  const {logout} = useContext(AuthContext)
  const {user, setUser} = useContext(AuthContext);  
  
  const fullName = user ? user.user.fullName : 'userName'
  const email = user ?  user.user.email : 'email'

  const logoutHandler  = async () => {
    
    await AsyncStorage.removeItem('userToken')    
    await navigation.closeDrawer();  
    await setUser(null);
    // navigation.navigate('Home')
  }

  const isDrawerOpened = useIsDrawerOpen();
  const polygonRef = React.useRef();
  const animatedWidth = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.ValueXY(fromCoords)).current;
  const animate = (toValue) => {
    const animations = [
      Animated.spring(animation, {
        toValue: toValue === 1 ? toCoords : fromCoords,
        useNativeDriver: true,
        bounciness: 2,
        speed: 10,
      }),
      Animated.timing(animatedWidth, {
        toValue: toValue === 1 ? width : 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ];

    return Animated.sequence(toValue === 1 ? animations.reverse() : animations);
  };

  React.useEffect(() => {
    const listener = animation.addListener((v) => {
      if (polygonRef?.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${v.x}, ${v.y} ${width}, ${height} 0, ${height}`,
        });
      }
    });

    return () => {
      animation.removeListener(listener);
    };
  });

  React.useEffect(() => {
    animate(isDrawerOpened ? 1 : 0).start();
  }, [isDrawerOpened]);

  const opacity = animation.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1],
  });

  const translateX = animation.x.interpolate({
    inputRange: [0, width],
    outputRange: [-50, 0],
  });

  const onRoutePress = React.useCallback((route) => {
    navigation.navigate(route);
  }, []);

  const onCloseDrawer = React.useCallback((route) => {
    navigation.closeDrawer();    
  }, []);

  return (
    <AnimatedMaskedView
      style={[styles.maskedContainer, { width: animatedWidth }]}
      maskElement={
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ backgroundColor: 'transparent' }}
        >
          <AnimatedPolygon
            ref={polygonRef}
            points={`0,0 ${fromCoords.x}, ${fromCoords.y} ${width}, ${height} 0, ${height}`}
            // points={`0,0 ${toCoords.x}, ${toCoords.y} ${width}, ${height} 0, ${height}`}
            fill='blue'
          />
        </Svg>
      }
    >
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={onCloseDrawer} style={{alignItems: 'flex-end'}}>          
          <AntDesign            
            name='close'
            size={32}
            color='#000'            
            style={{padding:20}}
          />
        </TouchableOpacity>    
        <View style={{height:200}}>
            <Image style={{width:80, height:80, resizeMode:'contain', borderRadius:40}} source={require('../../assets/images/profil.png')} />
            <View style={{marginVertical:20}}>
              <Text style={{fontFamily:'Poppins-SemiBold', fontSize:20}}>{fullName}</Text>
              <Text style={{fontFamily:'Poppins-Regular'}}>{email}</Text>
            </View>
        </View>    
        <Animated.View
          style={[styles.menu, { opacity, transform: [{ translateX }] }]}
        >
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  key={route}
                  title={route}      
                  index={index}            
                  style={[
                    styles.button,
                    {
                      textDecorationLine:
                        route === selectedRoute ? 'line-through' : 'none',
                      color: '#3b5998',
                    },
                  ]}
                  onPress={() => onRoutePress(route)}
                />
              );
            })}
            <Button
              key={"logout"}
              title={"Déconnexion"}
              index={8}
              style={[
                styles.button,
                {        
                  color: '#3b5998',
                },
              ]}
              onPress={() => logoutHandler()}
            />
          </View>

          {/* <View>
            {links.map((link, index) => {
              return (
                <Button
                  key={link}
                  title={link}
                  index={9}
                  style={[
                    styles.buttonSmall,                    
                  ]}
                  onPress={onCloseDrawer}
                />
              );
            })}
          </View> */}
        </Animated.View>
      </View>
    </AnimatedMaskedView>
  );
}

const styles = StyleSheet.create({
  maskedContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menu: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 32,
    color: '#fdfdfd',
    lineHeight: 32 * 1.5,
    fontFamily:'Poppins-SemiBold'
  },
  buttonSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: '#3b5998',
    fontFamily:'Poppins-Light',
    justifyContent: 'center',
  },
});