//import { StatusBar } from "expo-status-bar";
//import React from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import MainScreen from "./app/screens/MainScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";

//import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
//import Icon from "react-native-vector-icons/Ionicons";
//import { createMaterialTopTabNavigator } from "react-navigation";
//import AppTabNavigator from "./app/screens/AppTabNavigator";
//export default function App() {
// return <WelcomeScreen />;
//}

//remove comment to see main app
/*
export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <MainScreen />
      </SafeAreaView>
    );
  }
}*/
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetailScreen from "./app/screens/ProductDetailScreen";
import Product from "./app/screens/Product";
import Home from "./app/screens/Home";
import Search from "./app/screens/Search";
import Basket from "./app/screens/Basket";
import Profile from "./app/screens/Profile";
import Icon from "react-native-vector-icons/Ionicons";
import AppTabNavigator from "./app/screens/AppTabNavigator";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App(props) {
  return (
    <>
      <AppNavigation />
    </>
  );
  //or return <LoginScreen/>;
}
/*
//const MainStack = createBottomTabNavigator();
const Tab = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "My home",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: "black",
            position: "absolute",
            tabBarPosition: "bottom",
          },
        }}
      />
      <MainStack.Screen name="Search" component={Search} />
      <MainStack.Screen name="Basket" component={Basket} />
      <MainStack.Screen name="Profile" component={Profile} />
    </MainStack.Navigator>
  );
}

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="LoginScreen" component={LoginScreen} />
        <Tab.Screen name="RegisterScreen" component={RegisterScreen} />
        <Tab.Screen name="MainScreen" component={AppTabNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <AppNavigation />
    </>
  );
  //normally return <AppNavigation />;
}
*/
