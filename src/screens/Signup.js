import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../common/CustomButton';
import {useNavigation} from '@react-navigation/native';
// import { collection, addDoc } from "firebase/firestore"; 
// import { db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../firebaseConfig";
// import uuid from 'react-native-uuid';
export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");
  const onHandleSignup = async () => {
    if (email !== "" && password !== "" && name !== ""){
      try {
      
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userRef = (database, "users", user.uid);
        await (userRef, {
          displayName: name,
          email: email,
          uid: user.uid, 
        });
        Alert.alert("Signup Success")
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert(error.message);
      }
    }
    else {
      Alert.alert("Signup error");
      Alert.alert("Please Enter Required Data");
    }
   
  };
// const Signup = () => {
//   const navigation = useNavigation();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [pass, setPass] = useState('');
//   const [confirmPass, setConfirmPass] = useState('');
//   const addUser = () => {
//     // let uid = uuid.v4();
//     const db1 = db;
//     try {
//       const docRef = addDoc(collection(db1, "users"), {
//         name: name,
//         email: email,
//         mobile: mobile,
//         password: pass,
//         confirmPassword:confirmPass,
//       });
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Sign up'}</Text>
      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      {/* <TextInput
        placeholder="Enter Mobile"
        style={styles.input}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      /> */}
      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={password}
        onChangeText={txt => setPassword(txt)}//i have changed setpass to setpassword
      />
      {/* <TextInput
        placeholder="Enter Confirm Password"
        style={styles.input}
        value={confirmPass}
        onChangeText={txt => setConfirmPass(txt)}
      /> */}
      <CustomButton
        bg={'#E27800'}
        title={'Sign up'}
        color={'#fff'}
        onClick={() => {
          onHandleSignup();
        }}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        {'Login'}
      </Text>
    </View>
  );
};

// export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});