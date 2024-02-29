import { useState, useEffect } from 'react';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected}) => {

  const [ messages, setMessages] = useState([]);
  const { name, background, id } = route.params;

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessagesHistory = async (listsToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(listsToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  let unsubMessages;
  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        })
      });
      cacheMessagesHistory(newMessages);
      setMessages(newMessages);
    }); 
  } else loadCachedMessages();
  

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);


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

  const renderInputToolbar = (props) => {
    if (isConnected) 
    return <InputToolbar {...props} />;
    else return null;
   }
  

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
  
      <GiftedChat
      messages={messages}
      renderInputToolbar={renderInputToolbar}
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