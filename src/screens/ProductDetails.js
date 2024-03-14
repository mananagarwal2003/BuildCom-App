import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Header from "../common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../common/CustomButton";
import { useDispatch } from "react-redux";
import { addItemToWishList } from "../Redux/slices/WishlistSlice";
import { ScrollView } from "react-native-gesture-handler";
import { addItemToCart } from "../Redux/slices/CartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AskForLoginModal from "../common/AskForLoginModal";
import Wishlist from "./Tabs/Wishlist";
const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const checkUserStatus = async () => {
    let isUserLoggedIn = false;
    const status = await AsyncStorage.getItem("IS_USER_LOGGED_IN");
    console.log(status);
    if (status == null) {
      isUserLoggedIn = false;
    } else {
      isUserLoggedIn = true;
    }
    return isUserLoggedIn;
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../images/left-arrow.png")}
        RightIcon={require("../images/shopping-bag.png")}
        title={"Product Details "}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />

      <Image source={{ uri: route.params.data.image }} style={styles.image} />
      <Text style={styles.title}>{route.params.data.title}</Text>
      <Text style={styles.detail}>{route.params.data.description}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.price, { color: "#000" }]}>{"Price: "}</Text>
        <Text style={styles.price}>{"Rs." + route.params.data.price}</Text>
        <View style={styles.qtyView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (qty > 1) {
                setqty(qty - 1);
              }
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{qty}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setqty(qty + 1);
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.wishlist}
        onPress={() => {
          //if (checkUserStatus() === true) {
            dispatch(addItemToWishList(route.params.data));
            Alert.alert("Product Added to Wishlist")
          //else {
            //setModalVisible(true);
          
        }}
      >
        <Image source={require("../images/heart.png")} style={styles.icon} />
      </TouchableOpacity>
      <CustomButton
        bg={"#FAC000"}
        title={"Add To Cart"}
        onClick={() => {
          console.log(route.params.data);
          // if (checkUserStatus() === true) {
            dispatch(
              addItemToCart({
                category: route.params.data.category,
                description: route.params.data.description,
                id: route.params.data.id,
                image: route.params.data.image,
                price: route.params.data.price,
                qty: qty,
                rating: route.params.data.rating,
                title: route.params.data.title,
              })
            );
          // } else {
          //   setModalVisible(true);
          // }
        }}
      />
      <AskForLoginModal
        modalVisible={modalVisible}
        onClickLogin={() => {
          setModalVisible(false);
          navigation.navigate("Login");
        }}
        onClose={() => {
          setModalVisible(false);
        }}
        onClickSignup={() => {
          setModalVisible(false);
          navigation.navigate("Signup");
        }}
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "center",
  },
  title: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600",
    marginTop: 20,
    marginLeft: 30,
  },
  detail: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  price: {
    color: "green",
    marginLeft: 30,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
  },
  wishlist: {
    position: "absolute",
    right: 12,
    top: 120,
    backgroundColor: "#E2DFDF",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 22,
    height: 22,
  },
  qtyView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
});
