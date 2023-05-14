import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import Map from './components/Map'
import MapSearch from './components/MapSearch'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: "center",
            headerMode: 'screen',
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },            
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginPage}
          />
          <Stack.Screen
            name="/History"
            component={HomePage}
          />
          <Stack.Screen
            name="Map Search"
            component={MapSearch}
          />
          <Stack.Screen name="Sign Up" component={SignUpPage} />
          <Stack.Screen name="/Map" component={Map} />
          {/* <Stack.Screen name="Login" component={LoginPage} /> */}
          {/* 
          <Stack.Screen name="/Home" component={HomePage} />
          <Stack.Screen name="/Map" component={Map} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
}