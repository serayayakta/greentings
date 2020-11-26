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

export default class RegisterScreen extends Component {
  state = {
    email: "",
    password: "",
  };
  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require("../assets/greenland_background.jpg")}
      >
        <View style={styles.logoContainer}>
          <Text
            style={{
              fontSize: 20,
              paddingTop: 10,
            }}
          >
            Welcome to Greentings!
          </Text>
        </View>
        <View style={{ flex: 0.5 }}></View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Name..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
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
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>

        <View style={{ flex: 0.15 }}></View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>SIGN ME UP!</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Back To Login</Text>
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
