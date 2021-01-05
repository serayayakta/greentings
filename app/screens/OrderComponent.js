import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";

class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "1",
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id in  order component", value);
        this.setState({ user_id: value });
        // value previously stored
      } else {
        console.log("value of id is null");
      }
    } catch (e) {
      console.log("error in value id ", e);
      // error reading value
    }
  }
  componentDidMount() {
    this.getId();
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("OrderInvoiceScreen", {
            order_id: this.props.order_id,
            date: this.props.date,
            address: this.props.address,
            navigation: this.props.navigation,
            screen: "order",
          });
        }}
      >
        <View style={{ height: 150, width: "100%", backgroundColor: "white" }}>
          <View style={styles.container}>
            <View styles={{ flexDirection: "column" }}>
              <View styles={{ flex: 8 }}>
                <Text style={styles.text}>{this.props.order_id}</Text>
                <Text style={styles.brandName}>{this.props.date}</Text>
              </View>
              <View
                styles={{
                  flex: 4,
                  flexDirection: "row",
                }}
              >
                <View styles={{ flex: 3 }}>
                  <Text style={styles.text}>
                    total price: ${this.props.total_price}
                  </Text>
                </View>
                <View styles={{ flex: 1 }}>
                  <Text style={styles.text}>Adress: {this.props.adress}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
    padding: 15,
    position: "relative",
    flex: 1,
  },
  iconContainer: {
    right: 10,
    height: 40,
    width: 40,
    position: "absolute",
    right: -5,
    top: -45,
    flex: 1,
  },
  iconContainer2: {
    right: 10,
    height: 40,
    width: 40,
    position: "absolute",
    right: -5,
    top: -30,
    flex: 1,
  },
  image: {
    height: 200,
    borderRadius: 4,
  },
  text: {
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
});

export default withNavigation(OrderComponent);
