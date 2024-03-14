import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { Image } from "react-native";
  import { useSelector } from "react-redux";
  import { useNavigation } from "@react-navigation/native";
  const { height, width } = Dimensions.get("window");
  const Header1 = ({
    title,
    RightIcon,
    onClickRightIcon,
    isCart,
  }) => {
    const cartItems = useSelector((state) => state.cart);
    const navigation = useNavigation();
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btn}
        >
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        {!isCart && <View></View>}
        {isCart && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <Image
              source={RightIcon}
              style={[styles.icon, { width: 40, height: 40 }]}
            />
            <View
              style={{
                width: 30,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#fff",
                position: "absolute",
                right: 0,
                top: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#000" }}>{cartItems.data.length}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  export default Header1;
  const styles = StyleSheet.create({
    header: {
      width: width,
      height: 65,
      position:"relative",
      backgroundColor: "#0786DAFD",
      flexDirection: "row",
      justifyContent:"space-between",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 15,
    },
    btn: {
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: "#fff",
    },
    title: {
      color: "#fff",
      fontSize: 20,
    },
  });
  