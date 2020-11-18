import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";

function WelcomeScreen(props) {
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Button for sign in pressed")}
        >
          <Text style={styles.buttonText}>sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Button for sign up pressed")}
        >
          <Text style={styles.buttonText}>sign up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "25%",
    justifyContent: "space-evenly",
    height: "17%",
    width: "35%",
    //backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    //fontFamily: "-apple-system",
  },
  logo: {
    width: 300,
    height: 70,
  },
  logoContainer: {
    position: "absolute",
    top: "35%",
    alignItems: "center",
  },
});

export default WelcomeScreen;
