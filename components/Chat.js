import { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {

  const [ messages, setMessages] = useState([]);
  const { name, background, id } = route.params;


  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      });
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);


    // Set user name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  //Add messages to database 
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#007AFF"
        },
        left: {
          backgroundColor: "#ffffff"
        }
      }}
    />
  }
  

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
  
      <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: id,
        name: name
      }}
    />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>

  );
    
    

}

const styles = StyleSheet.create({
 container: {
   flex: 1
 },
 
});

export default Chat;