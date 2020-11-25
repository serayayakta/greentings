import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function componentName(props) {
  return (
    <TouchableOpacity style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.iconContainer}
          source={require("../assets/icon_heart.png")}
        />
      </TouchableOpacity>
      <Image style={styles.image} source={{ uri: props.image }} />

      <Text style={styles.text}>{props.product_name}</Text>
      <Text style={styles.brandName}>{props.brand_name}</Text>
      <Text style={styles.text}>price: ${props.price}</Text>
      <Text style={styles.text}>rating: {props.rating}/5</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  brandName: {
    textTransform: "uppercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
    marginBottom: 8,
  },
  container: {
    height: 300,
    margin: 15,
    backgroundColor: "#FFF",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7.5,
    padding: 20,
    position: "relative",
  },
  iconContainer: {
    right: 10,
    height: 40,
    width: 40,
    position: "absolute",
    right: -20,
    top: -15,
  },
  image: {
    margin: 10,
    height: "70%",
    borderRadius: 4,
  },
  text: {
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
});
