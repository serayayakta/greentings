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
import ViewImageScreen from "./app/screens/ViewImageScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
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

export default function App() {
  return <RegisterScreen />;
  //or return <LoginScreen/>;
}
