import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './HomeScreen';
import Login from './Login';
import Wishlist from './Tabs/Wishlist';
const Drawer=createDrawerNavigator();
const Main = () => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name='Login' 
    component={Login} 
    options={{headerShown:false }}
    />
      <Drawer.Screen name='HomeScreen' 
        component={HomeScreen} 
        options={{headerShown:false }}
        />
     <Drawer.Screen name='Wishlist' 
     component={Wishlist} 
     options={{headerShown:false }}
     />
 </Drawer.Navigator>
  )
}

export default Main