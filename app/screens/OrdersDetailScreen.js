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
import OrderComponent from "./OrderComponent";

export default class OrdersDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      /*order_id: "",
      date: "",
      total_price: "",
      adress: "",*/
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener(
      "willFocus",
      () => this.fetchOrders()
      // run function that updates the data on entering the screen
    );
  }

  async fetchOrders() {
    try {
      const user_id = await AsyncStorage.getItem("@user_id");
      if (user_id !== null) {
        fetch("http://127.0.0.1:8000/ord/" + user_id + "/")
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
  cancelOrder = (order_id) => {
    try {
      var requestOptions = {
        method: "PUT",
        redirect: "follow",
      };
      fetch(
        "http://127.0.0.1:8000/cancelorder/" + order_id + "/",
        requestOptions
      )
        .then((response) => {
          if (response.status == 200) {
            console.log("cancel request  200 :", response);
            alert("Order cancel request sent");
            this.handleRefresh();
          }
        })
        .catch((error) => console.log("fetch error", error));
      this.setState({ refreshing: false });
    } catch (e) {
      console.log("error in cancel order", e);
      //is checked alerti ver
    }
  };
  renderItemComponent = (data) => (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ width: "80%" }}>
        <OrderComponent
          order_id={data.item.order_id}
          date={data.item.date}
          total_price={data.item.total_price}
          adress={data.item.adress}
          navigation={this.props.navigation}
        />
      </View>
      <View style={{ width: "20%" }}>
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
                this.cancelOrder(data.item.order_id);
                //this.cancelOrder();
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: "50%" }}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                //this.decreaseQuantity(data.item.product_id, data.item.quantity);
                //this.changeAdress
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>
                Change adress
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchOrders();
    });
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <Button
            title="< Profile"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <ScrollView>
          <FlatList
            data={this.state.dataSource}
            renderItem={(item) => this.renderItemComponent(item)}
            keyExtractor={(item) => item.order_id.toString()}
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh()}
          ></FlatList>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    //borderWidth: 0.2,
    //borderColor: "grey",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
    flexDirection: "row",
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 25,
    marginHorizontal: 3,
  },
  inputText: {
    flex: 1,
    fontWeight: "700",
    marginStart: 40, //marginLeft de aynı oldu
    alignSelf: "center",
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: "#778899",
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,

    marginTop: 20,
  },

  goBackButton: {
    marginTop: 15,
    height: 45,
    //backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  separator: {
    height: 0.2,
    backgroundColor: "grey",
    marginTop: 5,
    marginHorizontal: 20,
  },
  quantityButton: {
    marginRight: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    backgroundColor: colors.primary,
  },
});
