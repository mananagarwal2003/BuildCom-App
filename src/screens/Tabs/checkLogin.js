import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { RawButton, TextInput } from "react-native-gesture-handler";
import { auth1 } from "../../../firebaseConfig";
import { auth, createUserWithEmailAndPassword } from "firebase/auth";
const User = () => {
  const [pass, setpass] = useState("");
  const [email, setemail] = useState("");
  const auth = auth1;
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, pass);
    //     .then(userCredential => {
    //      const user = userCredential.user;
    //      console.log(user.email);
    //    })

    //      .catch (error =>alert (error.message))
    // // //     const errorCode = error.code;
    // // //     const errorMessage = error.message;
  };
  return (
    <View>
      <Text>user</Text>
      <TextInput
        placeholder="enter email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setemail(text)}
      ></TextInput>
      <TextInput
        placeholder="enter password"
        style={styles.input}
        value={pass}
        onChangeText={(text) => setpass(text)}
      ></TextInput>
      <Button onPress={signup} title="login" color="#0786DAFD" />
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: "center",
  },
});
