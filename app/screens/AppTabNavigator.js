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

import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "react-navigation";
//export default function App() {
// return <WelcomeScreen />;
//}
import Home from "./Home";
import Basket from "./Basket";
import Search from "./Search";
import Profile from "./Profile";

/*class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Tab nav </Text>
      </View>
    );
  }
}
class SearchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> search tab </Text>
      </View>
    );
  }
}
class BasketScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Basket tab </Text>
      </View>
    );
  }
}
class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Profile tab </Text>
      </View>
    );
  }
}*/

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={24} />
        ),
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        ),
      },
    },
    Basket: {
      screen: Basket,
      navigationOptions: {
        tabBarLabel: "Basket",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-basket" color={tintColor} size={24} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    //swipeEnabled:false -->to disable swipe
    //order: ["Home", "Settings"],
    tabBarOptions: {
      activeTintColor: "darkseagreen",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "#f2f2f2",
        borderTopColor: "grey",
        borderTopWidth: 0.2,
      },
      indicatorStyle: {
        height: 0,
      },
      showIcon: true,
    },
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppTabNavigator;
