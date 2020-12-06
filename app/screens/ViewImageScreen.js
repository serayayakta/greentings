import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function ViewImageScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <Text style={styles.closeText}>X</Text>
      </View>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/gomi_soap_dish.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    width: 80,
    height: 40,
    backgroundColor: colors.secondary,
    position: "absolute",
    top: 50,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  closeText: {
    alignItems: "center",
  },
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ViewImageScreen;
