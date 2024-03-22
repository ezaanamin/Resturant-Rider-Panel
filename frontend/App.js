
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { styles } from './styles/styles';
import Login from './screens/Login';
import { Provider } from 'react-redux';
import { store } from "./redux/store"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';


export default function App() {


  
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}
