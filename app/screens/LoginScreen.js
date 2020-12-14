import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import RegisterScreen from "./RegisterScreen";
import MainScreen from "./MainScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      email: "",
      password: "",
      responseStatus: 0,
      user_id: "2",
    };
  }
  async setId() {
    try {
      await AsyncStorage.setItem("@user_id", this.state.user_id);
    } catch (e) {
      console.log("error", e);
    }
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id", value);
        // value previously stored
      } else {
        console.log("value of id is null");
      }
    } catch (e) {
      console.log("error in value id ", e);
      // error reading value
    }
  }
  onLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/login/", requestOptions)
      .then((response) => {
        response.json();
        this.setState({ responseStatus: response.status });
        console.log("response statusssss ", this.state.responseStatus);
      })
      .then((result) => {
        if (this.state.responseStatus == 202) {
          this.props.navigation.navigate("MainScreen");
          //this.setState({ user_id: result.data.user_id });
          this.setId();
          this.getId();
        }
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require("../assets/greenland_background.jpg")}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/Greentings_3dots.png")}
          />
          <Text
            style={{
              fontSize: 20,
              paddingTop: 10,
            }}
          >
            greets you from the future...
          </Text>
        </View>
        <View style={{ flex: 0.4 }}></View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(MainScreen)}
        >
          <Text style={styles.guest}>Continue without account...</Text>
        </TouchableOpacity>
        <View style={{ flex: 0.15 }}></View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.onLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(RegisterScreen)}
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: `#a9a9a9`,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  guest: {
    color: "white",
    fontSize: 14,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: `#9acd32`,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  logoContainer: {
    position: "absolute",
    top: "20%",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 70,
  },
});
