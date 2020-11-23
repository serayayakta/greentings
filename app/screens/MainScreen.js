//import { StatusBar } from "expo-status-bar";
//import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  Image,
} from "react-native";

//import ViewImageScreen from "./app/screens/ViewImageScreen";
//import WelcomeScreen from "./app/screens/WelcomeScreen";
import AppTabNavigator from "./AppTabNavigator"; //.app/screens yazınca foldera iki kere giriyor
import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "react-navigation";
//export default function App() {
// return <WelcomeScreen />;
//}

export default class MainScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <AppTabNavigator />
      </SafeAreaView>
    );
  }
}
