import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { withNavigation } from "react-navigation";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";
import PasswordDetailScreen from "./PasswordDetailScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      user_id: "1",
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
            <Title style={styles.title}>username</Title>
            <Caption style={styles.caption}>@user_name</Caption>
          </View>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="ios-heart" color="black" size={25} />
              <Text style={{ marginLeft: 10 }}>Favorites</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="ios-archive" size={25} />
              <Text style={{ marginLeft: 10 }}>Orders</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
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
          <TouchableRipple onPress={() => {}}>
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
