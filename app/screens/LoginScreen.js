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
      user_id: "0",
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
      } else {
        console.log("value of id is null");
      }
    } catch (e) {
      console.log("error in value id ", e);
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
        this.setState({ responseStatus: response.status });
        console.log("response statusssss ", this.state.responseStatus);
        if (this.state.responseStatus == 202) {
          response.json().then((data) => {
            this.setState({ user_id: data.user_id.toString() }, () => {
              console.log("data.user_id", data.user_id);
              console.log("data.user_id string", data.user_id.toString());
              this.setId();
              this.getId();
              this.props.navigation.navigate("MainScreen");
            });
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  async setIdZero() {
    try {
      await AsyncStorage.setItem("@user_id", "0");
      console.log("entered as a guest and id set to zero!");
    } catch (e) {
      console.log("error", e);
    }
  }

  deleteDummyBasket = (dummyProductId) => {
    try {
      const user_id = this.state.user_id;
      console.log("user id in delete dummy: ", user_id);
      if (user_id !== null) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          product: dummyProductId,
        });
        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch("http://127.0.0.1:8000/basket/" + user_id + "/", requestOptions)
          .then((response) => {
            if (response.status == 204) {
              console.log("dummy product removed, 204");
              this.props.navigation.navigate(MainScreen);
            }
            if (response.status == 404) {
              console.log(" 404 item not found in dummy", response);
            }
            if (response.status == 500) {
              console.log("dummyde 500????", response);
            }
          })
          .catch((error) => console.log("fetch error in dummy delete", error));
        this.setState({ refreshing: false });
      } else {
        console.log("user_id is null in dummy delete");
      }
    } catch (e) {
      console.log("error in dummy delete", e);
      //is checked alerti ver
    }
  };
  addToBasketDummy = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    dummyProductId = 14;

    var raw = JSON.stringify({ product: dummyProductId, quantity: 1 });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/basket/0/", requestOptions)
      .then((response) => {
        console.log("response status for dummy add to basket", response.status);
        if (response.status == 201) {
          response.json().then((data) => {
            console.log("new user added the dummy item.");
            const user_id = data[0].user_id.toString();
            this.setState({ user_id: user_id }, () => this.setId());
            console.log("new user id is: ", this.state.user_id);
            this.deleteDummyBasket(dummyProductId);
          });
        }
      })
      .catch((error) => console.log("fetch error", error));
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
          onPress={() => {
            this.setIdZero().then(() => this.addToBasketDummy());
          }}
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
