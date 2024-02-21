import Start from './components/Start';
import Chat from './components/Chat';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet } from 'react-native';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

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
          component={Chat}
        />
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