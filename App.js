import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  const connectionStatus = useNetInfo();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfaqbiMpHnbKrgJUwS6d1mxBDS6FeLCkc",
  authDomain: "chat-app-75449.firebaseapp.com",
  projectId: "chat-app-75449",
  storageBucket: "chat-app-75449.appspot.com",
  messagingSenderId: "567968191664",
  appId: "1:567968191664:web:9cb4f3d120c9792cc69775"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore/Storage and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Network connectivity status
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Chat-App"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        
        >
          {props => <Chat 
            isConnected={connectionStatus.isConnected} 
            db={db} 
            storage={storage}
            {...props} />}
        </Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>


  );
}

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textInput: {
//     width: '88%',
//     borderWidth: 1,
//     height: 50,
//     padding: 10,
//   },
//   textDisplay: {
//     height: 50,
//     lineHeight: 50,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: 'lightgrey',
//     padding: 10,
//   },
// });


export default App;