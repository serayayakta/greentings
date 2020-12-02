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

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  }

  onSignUp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      first_name: this.state.name,
      last_name: this.state.surname,
      email: this.state.email,
      phone_number: this.state.phoneNumber,
      password: this.state.confirmPassword,
      verified: false,
      user_type: "Customer",
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/signup/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error))
      .finally(() => {
        this.props.navigation.navigate("MainScreen");
      });
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
            style={styles.inputText}
            placeholder="Name..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ name: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Surname..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ surname: text })}
          />
        </View>
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
            style={styles.inputText}
            placeholder="Phone number..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ phoneNumber: text })}
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
            placeholder="Confirm password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ confirmPassword: text })}
          />
        </View>

        <View style={{ flex: 0.15 }}></View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.onSignUp}>
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
