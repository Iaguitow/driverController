//FEATURES
import React, { useContext } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { createDrawerNavigator,  DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator} from '@react-navigation/stack';
import { Drawer } from 'react-native-paper';
import Animated, { color } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, AntDesign } from '@expo/vector-icons';

//SCREENS
import ManagerDriverDay from '../screens/ManagerDriverDay';
import DriverWeekList from '../screens/DriverWeekList';
import Register from '../screens/Register';
import Configuration from '../screens/Configuration';

import globalLogin from "../classes/ClassGlobal.js"

const Drawers = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({navigation, style}) => {  
  
    return(
      <Animated.View style={[{flex:1}, style]}> 
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTitle: null,
                headerLeft: () => (
                    <TouchableOpacity onPress ={() => navigation.openDrawer()}>
                        <Feather name="menu" size={30} color="white" style={{width:30, height:30, left:5, bottom:6, top:3 }} />
                    </TouchableOpacity>
                )
            }}>
            <Stack.Screen name="ManagerDriverDay" component={ManagerDriverDay}/>
            <Stack.Screen name="DriverWeeekList" component={DriverWeekList}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Configuration" component={Configuration}/>
        </Stack.Navigator>   
     </Animated.View>   
    );
};

const DrawerContent = props => {

  const refresh = useContext(() => this.refresh());

    return(
        
        <DrawerContentScrollView {...props} scrollEnabled={false} >
            <Drawer.Section style={{borderBottomColor: 'white',borderBottomWidth: 0.5, marginLeft:"16%"}}>
                <View style={{flex:0.4, margin:20, backgroundColor:"transparent"}}>
                    <Image 
                        source={require('../images/face-Img.jpg')}
                        style={{width:120, height:120, borderRadius:70 }} />
                    <Text style={{ marginTop:10, fontSize:20, color:'white', marginLeft:'3%'}}> {globalLogin.isLogInName} </Text>
                    <Text style={{ fontSize:12, color:'white', marginLeft:'4%'}}> {globalLogin.isLogInCategory} </Text>
                </View>
            </Drawer.Section>
            <View>
                <DrawerItem
                    label="Manager Day"
                    labelStyle={{ color: 'white', marginLeft:-16, fontSize:16}}
                    onPress={() => props.navigation.navigate('ManagerDriverDay',{ongoback: refresh})}
                    icon={() => <AntDesign name="dashboard" color="white" size={22} />}
                />
                <DrawerItem
                    label="Week List"
                    labelStyle={{ color: 'white', marginLeft:-16, fontSize:16}}
                    onPress={() => props.navigation.navigate('DriverWeeekList',{ongoback: refresh})}
                    icon={() => <AntDesign name="bars" color="white" size={22} />}
                />
                <DrawerItem
                    label="User Register"
                    labelStyle={{ color: 'white', marginLeft:-16, fontSize:16}}
                    onPress={() => props.navigation.navigate('Register',{ongoback: refresh})}
                    icon={() => <AntDesign name="adduser" color="white" size={22} />}
                />

                <DrawerItem
                    label="Config."
                    labelStyle={{ color: 'white', marginLeft:-16, fontSize:16}}
                    onPress={() => props.navigation.navigate('Configuration',{ongoback: refresh})}
                    icon={() => <AntDesign name="tool" color="white" size={22} />}
                />
            </View>
            <Drawer.Section style={{marginTop:(Dimensions.get("window").height) -550, position:'relative',borderTopColor: 'white',borderTopWidth: 0.5, marginLeft:"16%", borderBottomColor:'white',borderBottomWidth:0.5}}>
                <View style={{flex:1}}>
                    <DrawerItem
                        label="Logout"
                        labelStyle={{ color: 'white', marginLeft:-16,fontSize:14 }}
                        icon={() => <AntDesign name="logout" color="white" size={22} />}
                        onPress={() => alert('Are your sure to logout?')}
                    />
                </View>
            </Drawer.Section>
        </DrawerContentScrollView>
    );
};

export default () =>
{
  const [Progress, setProgress] = React.useState(new Animated.Value(0));

  const scale = Animated.interpolate(Progress,{
      inputRange: [0,1],
      outputRange: [1,0.8]
  });

  const borderRadius = Animated.interpolate(Progress,{
    inputRange: [0,1],
    outputRange: [0,10]
});
  const animatedStyle = { borderRadius, transform: [{ scale }] };

    return (
        <LinearGradient style={{ flex: 1 }} colors={['#182834','#48D1CC']}>
          <Drawers.Navigator

            drawerType="slide"
            overlayColor="transparent"
            drawerStyle={styles.drawerStyles}
            contentContainerStyle={{ flex: 1 }}
            drawerContentOptions={{
              activeBackgroundColor: 'transparent',
              activeTintColor: 'white',
              inactiveTintColor: 'white',
            }}
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            drawerContent={(props) => {
                setTimeout(() => {
                    setProgress(props.progress);
                },100)
              return <DrawerContent {...props} />;
            }}>
            <Drawers.Screen name="Screens">
              {props => <Screens {...props} style={animatedStyle} />}
            </Drawers.Screen>
          </Drawers.Navigator>
        </LinearGradient>
      );
    };

    const styles = StyleSheet.create({
        stack: {
          flex: 1,
          shadowColor: '#FFF',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,
          elevation: 5,
         
        },
        drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
        drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
        drawerLabel: { color: 'white', marginLeft: -16 },
        avatar: {
          borderRadius: 60,
          marginBottom: 16,
          borderColor: 'white',
          borderWidth: StyleSheet.hairlineWidth,
        },
      });  