import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { withNavigation } from "react-navigation";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";
import PasswordDetailScreen from "./PasswordDetailScreen";
import OrdersDetailScreen from "./OrdersDetailScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      user_id: "1",
      first_name: "",
      last_name: "",
      email: "",
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id in profile", value);
        this.setState({ user_id: value });
        // value previously stored
      } else {
        console.log("value of id is null");
      }
    } catch (e) {
      console.log("error in value id ", e);
      // error reading value
    }
  }
  async fetchUserInfo() {
    var raw = JSON.stringify({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
    });

    try {
      const user_id = await AsyncStorage.getItem("@user_id");
      if (user_id !== null) {
        fetch("http://127.0.0.1:8000/user/" + user_id + "/")
          .then((response) => response.json())
          .then((result) => {
            this.setState({
              dataSource: result,
              refreshing: false,
            });
            console.log(result);
          })
          .catch((error) => console.log("fetch error", error));
        this.setState({ refreshing: false });
      } else {
        console.log("user_id is null");
      }
    } catch (e) {
      console.log("error in value user_id ", e);
    }
  }
  componentDidMount() {
    this.getId();
    this.fetchUserInfo();
  }
  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.fetchUserInfo();
    }); // call fetchCats after setting the state
  };

  async onLogout() {
    //const { state, goBack } = this.props.navigation;
    //const params = state.params || {};
    try {
      await AsyncStorage.setItem("@user_id", "0");
      await AsyncStorage.setItem("@total", "0");
      console.log("logout button is pressed");
      () => this.handleRefresh();
      /*this.props.navigation.navigate(
        "Stack",
        {},
        NavigationActions.navigate({
          routeName: "LoginScreen",
        })
      );*/
      //goBack(params.go_back_key);
      //this.props.navigation.goBack("LoginScreen");
      /*this.props.navigation.navigate("AppNavigation", {
        screen: "LoginScreen",
      });*/
    } catch (e) {
      console.log("error", e);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image
              source={{ uri: "https://picsum.photos/200/300" }}
              size={80}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title}>
              {this.state.dataSource.first_name}{" "}
              {this.state.dataSource.last_name}
            </Text>
            <Caption style={styles.caption}>
              {this.state.dataSource.email}
            </Caption>
          </View>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="ios-heart" color="black" size={25} />
              <Text style={{ marginLeft: 10 }}>Favorites</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              this.props.navigation.navigate("OrdersDetailScreen", {});
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="ios-archive" size={25} />
              <Text style={{ marginLeft: 10 }}>Orders</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              this.props.navigation.navigate("UserCommentsScreen", {});
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="ios-chatbubbles" size={25} />
              <Text style={{ marginLeft: 10 }}>Reviews</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              this.props.navigation.navigate("PasswordDetailScreen", {});
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="ios-settings" size={25} />
              <Text style={{ marginLeft: 10 }}>Change Password</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              this.onLogout();
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="ios-exit" size={25} />
              <Text style={{ marginLeft: 10 }}>Logout</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    );
  }
}
export default withNavigation(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 0.2,
    borderColor: "grey",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
