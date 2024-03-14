import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/core'
import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { deleteAddress } from '../Redux/slices/AddressSlice';

const Addresses = () => {
  const route =useRoute();
  const navigation=useNavigation();
  const addressList=useSelector(state=>state.address);
  const isFocused=useIsFocused();
  const dispatch= useDispatch();
  useEffect(()=>{
    console.log(addressList);
  },[isFocused]);
  const defaultAddress=async(item)=>{
    await AsyncStorage.setItem('MY_ADDRESS',''+item.city+","+item.pincode+",type:"+item.type,);
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Header leftIcon={require('../images/left-arrow.png')} title={'My Addresses'} 
      onClickLeftIcon={()=>{
        navigation.goBack();
      }}/>
      <FlatList data={addressList.data} renderItem={({item,index})=>{
        return(
          <TouchableOpacity style={{width:'90%',marginTop:20,paddingBottom:10,paddingLeft:20,paddingTop:10,backgroundColor:"#fff",borderWidth:0.5,alignSelf:'center',borderRadius:10}}
          onPress={()=>{
            defaultAddress(item);
          }}>
              <Text style={styles.state}>{`State:${item.state}`}</Text>
              <Text style={styles.state}>{`City:${item.city}`}</Text>
              <Text style={styles.state}>{`Pincode:${item.pincode}`}</Text>
              <Text style={[styles.state,{position:'absolute',right:15,top:10,backgroundColor:'#B1BFF5',padding:7,borderRadius:10,fontSize:10,fontWeight:'700'}]}>{item.type}</Text>
              <View style={styles.bottomView}>
                <TouchableOpacity style={[styles.bottomView,{marginRight:35}]} onPress={()=>{
                  navigation.navigate('AddAddress',{type:'edit',data:item})
                }}>
                <Image source={require('../images/edit.png')} style={styles.bottomIcon}/>
                  
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomView} onPress={()=>{
                    dispatch(deleteAddress(item.id));
                }}>
                <Image source={require('../images/delete.png')} style={styles.bottomIcon}/>
                  
                </TouchableOpacity>

              </View>
          </TouchableOpacity>

        )
      }} />
      <TouchableOpacity style={styles.addButton} onPress={()=>{
        navigation.navigate('AddAddress',{type:"new"});
      }}>
        <Text style={{color:'#fff',fontSize:30,top:-2}}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Addresses

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    addButton:{
      width:50,
      height:50,
      backgroundColor:'#EC8A00',
      borderRadius:25,
      position:'absolute',
      bottom:20,
      right:20,
      justifyContent:'center',
      alignItems:'center',
    },
    state:{
      color:'#000',
      fontSize:18,
    },
    bottomView:{
      position:'absolute',
      right:10,
      bottom:10,
      flexDirection:'row',
    },
    bottomIcon:{
      width:26,
      height:26,
      marginLeft:10,
      marginBottom:-8,

    }
})