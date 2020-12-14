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
import Icon from "react-native-vector-icons/Fontisto";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 1,
    };
  }

  render() {
    return (
      <View style={{ height: 150, width: "100%", backgroundColor: "black" }}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: this.props.img }} />

          <View styles={{ flexDirection: "column" }}>
            <View styles={{ flex: 8 }}>
              <Text style={styles.text}>{this.props.product_name}</Text>
              <Text style={styles.brandName}>{this.props.brand_name}</Text>
            </View>
            <View
              styles={{
                flex: 4,
                flexDirection: "row",
              }}
            >
              <View styles={{ flex: 3 }}>
                <Text style={styles.text}>quantity: {this.props.quantity}</Text>
              </View>
              <View styles={{ flex: 1 }}>
                <Text style={styles.text}>price: ${this.props.price}</Text>
              </View>
            </View>
          </View>
        </View>
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
    marginHorizontal: 10,
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
    padding: 15,
    position: "relative",
    flex: 12,
    flexDirection: "row",
  },
  image: {
    width: "45%",
    borderRadius: 4,
    resizeMode: "contain",
  },
  text: {
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
});

export default withNavigation(Product);
