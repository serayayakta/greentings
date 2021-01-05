import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BasketItem from "./BasketItem";

export default class PasswordDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      total: 0,
      refreshing: true,
      dataSource: [],
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id in order şnvoice", value);
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
  async fetchOrderProducts() {
    try {
      const user_id = await AsyncStorage.getItem("@user_id");
      const order_id = JSON.stringify(
        this.props.navigation.getParam("order_id", "0")
      );
      console.log(order_id, "order id is");
      if (user_id !== null) {
        fetch("http://127.0.0.1:8000/orditem/" + order_id + "/")
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
  componentDidMount() {
    this.getId();
    const { navigation } = this.props;
    this.fetchOrderProducts();
  }
  renderItemComponent = (data) => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View>
        <BasketItem
          img={data.item.img}
          brand_name={data.item.brand_name}
          product_name={data.item.product_name}
          quantity={data.item.quantity}
          price={data.item.price}
          navigation={this.props.navigation}
        />
      </View>
      <Text style={{ alignSelf: "center", paddingBottom: 10 }}>
        Status: {data.item.status}
      </Text>
    </View>
  );
  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchOrderProducts();
    });
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {this.props.navigation.getParam("screen", "payment") == "order" && (
          <View style={styles.goBackButton}>
            <Button
              title="< Orders"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        )}

        <ScrollView>
          <View styles={{ alignItems: "center" }}>
            {this.props.navigation.getParam("screen", "payment") ==
              "payment" && (
              <View style={{ alignItems: "center", marginTop: 30 }}>
                <Text style={{ color: "green", fontSize: 20 }}>
                  Order recieved!
                </Text>
              </View>
            )}
            <Text style={styles.totalPriceText}>
              Order number:{" "}
              {JSON.stringify(this.props.navigation.getParam("order_id", "0"))}
            </Text>
            <Text style={{ alignSelf: "center" }}>
              Date: {this.props.navigation.getParam("date", "0")}
            </Text>

            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.totalPriceText}>$ {this.state.total}</Text>
          </View>
          {this.props.navigation.getParam("screen", "payment") == "payment" && (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => this.props.navigation.navigate("Basket")}
              >
                <Text style={{ color: "white" }}>Continue shopping</Text>
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            data={this.state.dataSource}
            renderItem={(item) => this.renderItemComponent(item)}
            keyExtractor={(item) => item.product_id.toString()}
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh()}
          ></FlatList>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 80,
  },
  goBackButton: {
    marginTop: 15,
    height: 45,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
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
  greenButton: {
    margin: 10,
    height: 45,
    width: "60%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
});
