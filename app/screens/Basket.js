import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
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
      user_id: "",
    };
  }
  async getId() {
    const value = await AsyncStorage.getItem("@user_id");
    if (value !== null) {
      console.log("value of id in basket screen", value);
      this.setState({ user_id: value });
      // value previously stored
    } else {
      console.log("value of id is null");
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
            var total = 0;
            for (var i = 0; i < result.length; i++) {
              var price = Number(result[i].price * result[i].quantity);
              total = total + price;
              console.log("total now: ", total);
            }
            this.setState({
              total: total,
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

  async decreaseQuantity() {}

  componentDidMount() {
    this.getId();
    const { navigation } = this.props;
    navigation.addListener(
      "willFocus",
      () => this.fetchBasketItems()
      // run function that updates the data on entering the screen
    );
  }
  renderItemComponent = (data) => (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ width: "90%" }}>
        <BasketItem
          img={data.item.img}
          brand_name={data.item.brand_name}
          product_name={data.item.product_name}
          quantity={data.item.quantity}
          price={data.item.price}
          navigation={this.props.navigation}
          discount={data.item.discount}
          base_price={data.item.base_price}
        />
      </View>
      <View style={{ width: "10%" }}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            paddingVertical: 20,
            marginTop: 10,
          }}
        >
          <View style={{ height: "50%" }}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                this.increaseQuantity(data.item.product_id, data.item.quantity);
                //this.getTotal()
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: "50%" }}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                this.decreaseQuantity(data.item.product_id, data.item.quantity);
                //this.getTotal()
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  FlatListHeader = () => {
    return (
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/Greentings_3dots.png")}
        />
      </View>
    );
  };
  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchBasketItems();
    });
  };
  increaseQuantity = (id, quantity) => {
    try {
      const user_id = this.state.user_id;
      console.log("user_id in increase quantity: ", user_id);
      if (user_id !== null) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          product: id,
          quantity: quantity + 1,
        });
        console.log("raw ord body: ", raw);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch("http://127.0.0.1:8000/basket/" + user_id + "/", requestOptions)
          .then((response) => {
            if (response.status == 200) {
              //alert and navigate back

              console.log("başarılııı 201 :", response);
              alert("Quantity increased");
              this.handleRefresh();
            }
            if (response.status == 406) {
              console.log(" 406 stock not enough", response);
              alert("Quantity increased");
              this.handleRefresh();
            }
            if (response.status == 500) {
              console.log(" 500????", response);
            }
          })
          .catch((error) => console.log("fetch error", error));
        this.setState({ refreshing: false });
      } else {
        console.log("user_id is null in increase quantity");
      }
    } catch (e) {
      console.log("error in inc qty", e);
      //is checked alerti ver
    }
  };
  decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      try {
        const user_id = this.state.user_id;
        console.log("user_id in increase quantity: ", user_id);
        if (user_id !== null) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({
            product: id,
            quantity: quantity - 1,
          });
          console.log("raw ord body: ", raw);
          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          fetch("http://127.0.0.1:8000/basket/" + user_id + "/", requestOptions)
            .then((response) => {
              if (response.status == 200) {
                //alert and navigate back

                console.log("başarılııı 201 :", response);
                alert("Quantity decreased");
                this.handleRefresh();
              }
              if (response.status == 406) {
                console.log(" 406 stock not enough", response);
                this.handleRefresh();
              }
              if (response.status == 500) {
                console.log(" 500????", response);
              }
            })
            .catch((error) => console.log("fetch error", error));
          this.setState({ refreshing: false });
        } else {
          console.log("user_id is null in decrease quantity");
        }
      } catch (e) {
        console.log("error in dec qty", e);
        //is checked alerti ver
      }
    } else {
      try {
        const user_id = this.state.user_id;
        console.log("user_id in increase quantity: ", user_id);
        if (user_id !== null) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({
            product: id,
          });
          console.log("raw ord body: ", raw);
          var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          fetch("http://127.0.0.1:8000/basket/" + user_id + "/", requestOptions)
            .then((response) => {
              if (response.status == 204) {
                //alert and navigate back

                console.log("removal success 204 :", response);
                alert("Product removed");
                this.handleRefresh();
              }
              if (response.status == 404) {
                console.log(" 404 item not found", response);
                this.handleRefresh();
              }
              if (response.status == 500) {
                console.log(" 500????", response);
              }
            })
            .catch((error) => console.log("fetch error", error));
          this.setState({ refreshing: false });
        } else {
          console.log("user_id is null in decrease quantity");
        }
      } catch (e) {
        console.log("error in dec qty", e);
        //is checked alerti ver
      }
    }
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
              ListHeaderComponent={this.FlatListHeader}
              data={this.state.dataSource}
              renderItem={(item) => this.renderItemComponent(item)}
              keyExtractor={(item) => item.product_id.toString()}
              refreshing={this.state.refreshing}
              onRefresh={() => this.handleRefresh()}
            ></FlatList>
            {this.state.total == 0 && (
              <View>
                <Text
                  style={{
                    fontFamily: "Helvetica Neue",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  Basket is empty...
                </Text>
              </View>
            )}
            {this.state.total > 0 && (
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    paddingBottom: 5,
                  }}
                >
                  your basket looks yummy...
                </Text>
                <View>
                  <Text style={styles.totalPriceText}>Total Price</Text>
                  <Text style={styles.totalPriceText}>
                    $ {this.state.total}
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => {
                      //this.getTotal();
                      this.props.navigation.navigate("PaymentScreen", {
                        total: this.state.total,
                      });
                    }}
                  >
                    <Text style={{ color: "white" }}>Checkout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      );
    }
  }
}
export default Basket;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButton: {
    margin: 10,
    height: 45,
    width: "60%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 70,
  },
  totalPriceText: {
    margin: 10,
    fontSize: 18,
    textShadowColor: "black",
    textShadowOffset: { width: 0.2, height: 0.5 },
    textShadowRadius: 2,
    textAlign: "center",
    marginRight: 15,
  },
  quantityButton: {
    marginRight: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    backgroundColor: colors.primary,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7.5,
  },
});
