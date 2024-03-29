import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class PasswordDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      user_id: "",
      old_password: "",
      new_password: "",
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
  componentDidMount() {
    this.getId();
  }
  onUpdate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      old_password: this.state.old_password,
      new_password: this.state.new_password,
      user_id: this.state.user_id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/pass/", requestOptions)
      .then((response) => {
        this.setState({ responseStatus: response.status });
        console.log("response statusssss ", this.state.responseStatus);
        if (this.state.responseStatus == 200) {
          alert("Password successfully changed!");
        }
        if (this.state.responseStatus == 400) {
          alert("Invalid password");
        }
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <Button
            title="< Profile"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles.menuWrapper}>
          <View style={styles.menuItem}>
            <Text style={{ marginLeft: 10 }}>Current Password</Text>
            <TextInput
              placeholder="  Enter current password"
              placeholderTextColor="grey"
              style={styles.inputText}
              secureTextEntry
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({ old_password: text }),
                  console.log("hey", this.state.old_password);
              }}

              //onChangeText={() => {
              //this.setState({ searchKey: text });
              //}}
            />
          </View>
          <View style={styles.separator}></View>
          <View style={styles.menuItem}>
            <Text style={{ marginLeft: 10 }}>New Password</Text>
            <TextInput
              placeholder="       Enter new password"
              placeholderTextColor="grey"
              style={styles.inputText}
              secureTextEntry
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({ new_password: text }),
                  console.log("hey", this.state.new_password);
              }}
            />
          </View>
          <View style={styles.separator}></View>
          <View style={styles.menuItem}>
            <Text style={{ marginLeft: 10 }}>Confirm Password</Text>
            <TextInput
              placeholder="Enter password again"
              placeholderTextColor="grey"
              style={styles.inputText}
              secureTextEntry
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({ new_password: text }),
                  console.log("hey", this.state.new_password);
              }}
            />
          </View>
          <View style={styles.separator}></View>
          <View style={styles.menuItem}>
            <Text style={{ marginLeft: 10 }}>
              New password needs to contain uppercase, number and special
              characters.
            </Text>
          </View>
          <View style={styles.separator}></View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.loginBtn} onPress={this.onUpdate}>
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    //borderWidth: 0.2,
    //borderColor: "grey",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
    flexDirection: "row",
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 25,
    marginHorizontal: 3,
  },
  inputText: {
    flex: 1,
    fontWeight: "700",
    marginStart: 40, //marginLeft de aynı oldu
    alignSelf: "center",
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: "#778899",
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#f2f2f2",
  },

  goBackButton: {
    marginTop: 15,
    height: 45,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  separator: {
    height: 0.2,
    backgroundColor: "grey",
    marginTop: 5,
    marginHorizontal: 20,
  },
  loginBtn: {
    width: "80%",
    //backgroundColor: `#9acd32`,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: colors.primary,
  },
  btnText: {
    color: "white",
  },
});
