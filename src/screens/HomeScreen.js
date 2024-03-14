import { View, Text, StyleSheet, Image, TouchableOpacity,Keyboard } from 'react-native';
import React, { useState,useEffect } from 'react';
import Home from './Tabs/Home';
import Search1 from './Tabs/Search1';
import Wishlist from './Tabs/Wishlist';
import Notification from './Tabs/Notifications';
import User from './Tabs/User';
const HomeScreen = () => {
  const [selectedTab, setSelectedTab]= useState(0);
  const [isKeyboardVisible,setIsKeyboardVisible]=useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setIsKeyboardVisible(true);
        },
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setIsKeyboardVisible(false);
        },
    );

    return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
    };
}, []);
  return (
    <View style={styles.container}>
    {selectedTab==0?(
     <Home/>
    ):selectedTab==1?(
      <Search1/>
    ):selectedTab==2?(
      <Wishlist/>
     ):selectedTab==3?(
      <Notification/>
     ):(<User/>)}
     {!isKeyboardVisible && (
      <View style={styles.bottomView}>
      <TouchableOpacity style={styles.bottomTab} 
        onPress={()=> {
        setSelectedTab(0);
      }}>
        <Image source={selectedTab==0? require('../images/homefill.png'):require('../images/home.png')} style={styles.bottomTabIcon}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomTab}
      onPress={()=> {
        setSelectedTab(1);
      }}>
        <Image source={
          selectedTab==1? require('../images/searchfill.png'):
          require('../images/search.png')} style={styles.bottomTabIcon}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomTab}
       onPress={()=> {
        setSelectedTab(2);
      }}>
        <Image source={
          selectedTab==2? require('../images/heartfill.png'):
          require('../images/heart.png')} style={styles.bottomTabIcon}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomTab}
       onPress={()=> {
        setSelectedTab(3);
      }}>
        <Image source={
          selectedTab==3? require('../images/bellfill.png'):
          require('../images/bell.png')} style={styles.bottomTabIcon}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomTab}
       onPress={()=> {
        setSelectedTab(4);
      }}>
        <Image source={selectedTab==4? require('../images/userfill.png'):
        require('../images/user.png')} style={styles.bottomTabIcon}></Image>
      </TouchableOpacity>
    </View>
     )}
    
    </View>
  );
};

export default HomeScreen
const styles=StyleSheet.create({
  container :{
    flex:1,
  },
  bottomView:{
    position:'absolute',
    bottom:0,
    width:'100%',
    height:70,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    backgroundColor:'#fff',
  },
  bottomTab:{
    width:'20%',
    height:'100%',
    marginLeft:'14%',
    justifyContent:'center',
    alignContent:'center',
  },
  bottomTabIcon:{
    width:24,
    height:24,
  }
});