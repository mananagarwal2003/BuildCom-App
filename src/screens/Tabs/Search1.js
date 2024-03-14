import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../common/Header";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Header1 from "../../common/Header1";

const Search1 = () => {
  const products = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const [oldData, setOldData] = useState(products.product.data);
  const navigation = useNavigation();
  const [searchedList, setSearchedList] = useState([]);
  const filterData = (txt) => {
    let newData = oldData.filter((item) => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    setSearchedList(newData);
  };

  return (
    <View style={styles.container}>
      <Header1
        title={"Search Items"}
        RightIcon={require("../../images/shopping-bag.png")}
        isCart={true}
      />
      <View style={styles.searchView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../images/search.png")}
            style={styles.icon}
          />
          <TextInput
            value={search}
            onChangeText={(txt) => {
              setSearch(txt);
              filterData(txt);
            }}
            placeholder="Search items here..."
            style={styles.input}
          />
        </View>
        {search !== "" && (
          <TouchableOpacity
            style={[
              styles.icon,
              { justifyContent: "center", alignItems: "center" },
            ]}
            onPress={() => {
              setSearch("");
              filterData("");
            }}
          >
            <Image
              source={require("../../images/close.png")}
              style={[styles.icon, { width: 20, height: 20 }]}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: 15 }}>
        <FlatList
          data={searchedList}
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
    </View>
  );
};

export default Search1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchView: {
    width: "90%",
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 20,
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 26,
    resizeMode: "center",
  },
  input: {
    width: "80%",
    marginLeft: 15,
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
