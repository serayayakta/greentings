import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "react-native-star-rating";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View styles={{ height: "100%" }}>
        <View styles={{ flex: 3 }}>
          <Image style={styles.image} source={{ uri: this.props.img }} />
        </View>
        <View styles={{ flex: 3 }}>
          <Text style={styles.text}>{this.props.product_name}</Text>
          <Text style={styles.brandName}>{this.props.brand_name}</Text>
          {this.props.discount == true && (
            <Text style={styles.oldPrice}>${this.props.base_price}</Text>
          )}
          <Text style={styles.price}>price: ${this.props.price}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.props.rating}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            fullStarColor={"darkgreen"}
            starSize={14}
          ></StarRating>
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
  image: {
    height: 190,
    borderRadius: 4,
  },
  oldPrice: {
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "line-through",
    textDecorationColor: "red",
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
  price: {
    color: "black",
    fontWeight: "bold",
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
  text: {
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
});

export default withNavigation(Product);
