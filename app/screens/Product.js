import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ProductDetailScreen from "./ProductDetailScreen";
import { withNavigation } from "react-navigation";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            style={styles.iconContainer}
            source={require("../assets/icon_heart.png")}
          />
        </TouchableOpacity>
        <Image style={styles.image} source={{ uri: this.props.image }} />

        <Text style={styles.text}>{this.props.product_name}</Text>
        <Text style={styles.brandName}>{this.props.brand_name}</Text>
        <Text style={styles.text}>price: ${this.props.price}</Text>
        <Text style={styles.text}>rating: {this.props.rating}/5</Text>
      </View>
    );
  }
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
    marginHorizontal: 30,
    marginVertical: 15,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
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

export default withNavigation(Product);
