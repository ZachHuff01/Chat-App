import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {

  const { name, background } = route.params;


  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);
  

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.text}>CHAT!</Text>
    </View>
  );
    
    

}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },

 text: {
  fontSize: 50,
 },
 
});

export default Chat;