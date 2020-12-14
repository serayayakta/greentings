import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BasketItem from "./BasketItem";

class Basket extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BasketItem
          img="https://cdn.shopify.com/s/files/1/0009/0924/6519/products/Processed-Product-Shots--1_1000x.jpg?v=1569362029"
          product_name="Tote Bag"
          brand_name="wwfmarket"
          quantity="3"
          price="70"
        ></BasketItem>
      </View>
    );
  }
}
export default Basket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
