import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

class BasketItem extends Component {
  constructor(props) {
    super(props);
  }

  async addPrice() {
    try {
      const price = this.props.price;
      try {
        const totalstr = await AsyncStorage.getItem("@total");

        if (total != null) {
          const total = Number(totalstr);
          console.log("total now: ", totalstr);
          try {
            await AsyncStorage.setItem("@total", (total + price).toString());
          } catch (e) {
            console.log("error in incrementing total price", e);
          }
        } else {
          try {
            await AsyncStorage.setItem("@total", (0).toString());

            try {
              await AsyncStorage.setItem("@total", price.toString());
            } catch (e) {
              console.log("error in adding first price", e);
            }
          } catch (e) {
            console.log("error in setting total price to zero", e);
          }
        }
      } catch (e) {
        console.log("error reading total price from local storage", e);
      }
    } catch (e) {
      console.log("error geting price props from basket", e);
    }
  }

  componentDidMount() {
    this.addPrice();
  }

  render() {
    return (
      <View style={{ height: 150, width: "100%" }}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: this.props.img }} />

          <View styles={{ flexDirection: "column" }}>
            <View styles={{ flex: 8 }}>
              <Text
                style={styles.text}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {this.props.product_name}
              </Text>
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
  addPrice = () => {
    const price = this.props.price;
    const total = AsyncStorage.getItem("@total");
    AsyncStorage.setItem("@total", (total + price).toString());
  };
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

export default withNavigation(BasketItem);
