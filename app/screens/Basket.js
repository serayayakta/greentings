import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BasketItem from "./BasketItem";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      total: 0,
    };
  }

  async setTotalZero() {
    try {
      await AsyncStorage.setItem("@total", (0).toString());
    } catch (e) {
      console.log("error setting total zero", e);
    }
  }

  async getTotal() {
    try {
      const total = await AsyncStorage.getItem("@total");
      if (total !== null) {
        console.log("value of total in basket", total);
        this.setState({
          total: total,
        });
      } else {
        console.log("value of total in basket is null");
      }
    } catch (e) {
      console.log("error in total ", e);
    }
  }

  async fetchBasketItems() {
    try {
      const user_id = await AsyncStorage.getItem("@user_id");
      if (user_id !== null) {
        fetch("http://127.0.0.1:8000/basket/" + user_id + "/")
          .then((response) => response.json())
          .then((result) => {
            this.setState({
              dataSource: result,
              refreshing: false,
            });
          })
          .catch((error) => console.log("fetch error", error));
        this.setState({ refreshing: false });
      } else {
        console.log("user_id is null");
      }
    } catch (e) {
      console.log("error in value user_id ", e);
    }
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener(
      "willFocus",
      () => this.fetchBasketItems()
      // run function that updates the data on entering the screen
    );
    this.setTotalZero();
  }
  renderItemComponent = (data) => (
    <BasketItem
      img={data.item.img}
      brand_name={data.item.brand_name}
      product_name={data.item.product_name}
      quantity={data.item.quantity}
      price={data.item.price}
      navigation={this.props.navigation}
    />
  );
  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchBasketItems();
    });
  };
  render() {
    if (this.state.refreshing) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "Helvetica Neue",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Loading...
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <FlatList
              data={this.state.dataSource}
              renderItem={(item) => this.renderItemComponent(item)}
              keyExtractor={(item) => item.product_id.toString()}
              refreshing={this.state.refreshing}
              onRefresh={() => this.handleRefresh()}
            ></FlatList>
            <TouchableOpacity>
              <Text style={{ color: "black" }}>{this.state.total}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                this.getTotal();
                this.props.navigation.navigate("PaymentScreen", {
                  total: this.state.total,
                });
              }}
            >
              <Text style={{ color: "white" }}>Checkout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  }
}
export default Basket;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButton: {
    margin: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
});
