import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import BasketItem from "./BasketItem";
import colors from "../config/colors";

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
    };
  }
  fetchBasketItems() {
    fetch("http://127.0.0.1:8000/basket/1/")
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          dataSource: result,
          refreshing: false,
        });
      })
      .catch((error) => console.log("fetch error", error));
    this.setState({ refreshing: false });
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener(
      "willFocus",
      () => this.fetchBasketItems()
      // run function that updates the data on entering the screen
    );
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
    }
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
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => this.clickEventListener()}
          >
            <Text>Checkout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
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
