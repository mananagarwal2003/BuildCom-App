import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../common/Header";
import { useNavigation } from "@react-navigation/native";
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../Redux/slices/CartSlice";
import CheckoutLayout from "../common/CheckoutLayout";
const Cart = () => {
  const items = useSelector((state) => state.cart);
  const navigation = useNavigation();
  const [Cartitems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(items.data);
  }, [items]);
  const getTotal = () => {
    let total = 0;
    Cartitems.map((item) => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../images/left-arrow.png")}
        RightIcon={require("../images/shopping-bag.png")}
        title={"Cart items"}
        isCart={true}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={Cartitems}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}
              onPress={() => {
                navigation.navigate("ProductDetails", { data: item });
              }}
            >
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View>
                <Text style={styles.name}>
                  {item.title.length > 20
                    ? item.title.substring(0, 20) + "..."
                    : item.title}
                </Text>
                <Text style={styles.desc}>
                  {item.description.length > 30
                    ? item.description.substring(0, 30) + "..."
                    : item.description}
                </Text>
                <View style={styles.qtyview}>
                  <Text style={styles.price}>{"Rs." + item.price}</Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      if (item.qty > 1) {
                        dispatch(reduceItemFromCart(item));
                      } else {
                        dispatch(removeItemFromCart(index));
                      }
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item.qty}</Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      dispatch(addItemToCart(item));
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {Cartitems.length < 1 && (
        <View style={styles.noItems}>
          <Text>No Items in Cart</Text>
        </View>
      )}
      {Cartitems.length > 0 && (
        <CheckoutLayout items={Cartitems.length} total={getTotal()} />
      )}
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productItem: {
    width: Dimensions.get("window").width,
    height: 100,
    marginTop: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
  },
  itemImage: {
    height: 100,
    width: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  desc: {
    marginLeft: 10,
  },
  price: {
    color: "green",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 5,
  },
  qtyview: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
  noItems: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
