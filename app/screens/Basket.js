import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Basket extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Basket </Text>
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
