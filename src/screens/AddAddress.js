import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import Header from "../common/Header";
import CustomButton from "../common/CustomButton";
import { useDispatch } from "react-redux";
import {
  addAddress,
  updateAddress,
  deleteAddress,
} from "../Redux/slices/AddressSlice";
import uuid from "react-native-uuid";

const AddAddress = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [type, setType] = useState(
    route.params.type == "edit" ? (route.params.data.type == "Home" ? 2 : 1) : 2
  );
  const [state, setState] = useState(
    route.params.type == "edit" ? route.params.data.state : ""
  );
  const [city, setCity] = useState(
    route.params.type == "edit" ? route.params.data.city : ""
  );
  const [pincode, setPincode] = useState(
    route.params.type == "edit" ? route.params.data.pincode : ""
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../images/left-arrow.png")}
        title={route.params.type == "edit" ? "Edit Address" : "Add New Address"}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        placeholder="Enter State"
        style={[styles.input, { marginTop: 50 }]}
        value={state}
        onChangeText={(txt) => setState(txt)}
      />
      <TextInput
        placeholder="Enter City"
        style={[styles.input, { marginTop: 20 }]}
        value={city}
        onChangeText={(txt) => setCity(txt)}
      />
      <TextInput
        placeholder="Enter Pincode"
        keyboardType={"number-pad"}
        style={[styles.input, { marginTop: 20 }]}
        value={pincode}
        onChangeText={(txt) => setPincode(txt)}
      />
      <View style={styles.typeView}>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            { borderWidth: 0.5, borderColor: type == 1 ? "orange" : "black" },
          ]}
          onPress={() => {
            setType(1);
          }}
        >
          <Image
            source={
              type == 1
                ? require("../images/radio_1.png")
                : require("../images/radio_2.png")
            }
            style={styles.radio}
          />
          <Text style={styles.radioTxt}>{"Work"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            { borderWidth: 0.5, borderColor: type == 2 ? "orange" : "black" },
          ]}
          onPress={() => {
            setType(2);
          }}
        >
          <Image
            source={
              type == 2
                ? require("../images/radio_1.png")
                : require("../images/radio_2.png")
            }
            style={styles.radio}
          />
          <Text style={styles.radioTxt}>{"Home"}</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        bg={"#FE9000"}
        title={"Save Address"}
        color={"#fff"}
        onClick={() => {
          if (route.params.type == "edit") {
            dispatch(
              updateAddress({
                state: state,
                city: city,
                pincode: pincode,
                type: type == 1 ? "Work" : "Home",
                id: route.params.data.id,
              }),
              navigation.goBack()
            );
          } else {
            dispatch(
              addAddress({
                state: state,
                city: city,
                pincode: pincode,
                type: type == 1 ? "Work" : "Home",
                id: uuid.v4(),
              }),
              navigation.goBack()
            );
          }
        }}
      />
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: "center",
    paddingLeft: 20,
  },
  typeView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  typeBtn: {
    width: "40%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
  },
  radio: {
    width: 24,
    height: 24,
  },
  radioTxt: {
    marginLeft: 10,
  },
});
