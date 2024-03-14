import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { addProducts } from "../../Redux/slices/productsSlice";
import Header1 from "../../common/Header1";

const Home = ({}) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:I-pmUSD6/1")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        json.map(item=>{
          item.qty =1;
        });
        dispatch(addProducts(json));
      });
  };
  return (
    <View style={styles.container}>
      <Header1
        // leftIcon={require("../../images/menu.png")}
        RightIcon={require("../../images/shopping-bag.png")}
        title={"BuildCom"}
        // onClickLeftIcon={() => {
        //   navigation.openDrawer();
        // }}
        isCart={true}
      />
      <FlatList
        data={products}
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
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
