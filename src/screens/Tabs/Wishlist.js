import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../HomeScreen";
import ProductDetails from "../ProductDetails";
import { ScrollView } from "react-native-gesture-handler";
import Header1 from "../../common/Header1";
import { addItemToWishList ,removeItemFromList} from "../../Redux/slices/WishlistSlice";
import Home from "./Home";
const Wishlist = () => {
  const items = useSelector((state) => state.wishlist);
  const navigation = useNavigation();
  const [wishlistItems, setwishlistItems] = useState(items.data);
  const dispatch = useDispatch();
  var [Cartitems, setCartItems] = useState(10);
  return (
    <View style={styles.container}>
      <Header1
        RightIcon={require("../../images/shopping-bag.png")}
        title={"Wishlist Items"}
        isCart={true}
      />
      <ScrollView>
      <FlatList
        data={wishlistItems }
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
                <Text style={styles.price}>{"Rs." + item.price}</Text>
              </View>
                <TouchableOpacity style={styles.bottomView} onPress={()=>{
                    dispatch(removeItemFromList(index));
                    Alert.alert("Item Removed");
                    navigation.navigate("Cart")
                }}>
                  <Image source={require('../../images/delete.png')} style={styles.bottomIcon}/>
                </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
      </ScrollView>
    </View>

  );
};

export default Wishlist;
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

    },
});
