import { View, Text , StyleSheet,} from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import Header1 from '../../common/Header1';

const Notifications = () => {
  return (
    <View  >
     <Header1 
        title={"Notification"}
        RightIcon={require("../../images/shopping-bag.png")}
        isCart={true}
      />
    </View>
  )
  
};
const styles = StyleSheet.create({
  container: {
    paddingRight:50,
    backgroundColor:"#0786D"
  },
});
export default Notifications