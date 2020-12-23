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
      user_id: "1",
      /*order_id: "",
      date: "",
      total_price: "",
      adress: "",*/
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id in orderdetail", value);
        this.setState({ user_id: value });
        console.log("value of id in orderdetail", this.state.user_id);
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
    const { navigation } = this.props;

    navigation.addListener(
      "willFocus",
      () => this.fetchOrders()
      // run function that updates the data on entering the screen
    );
  }
  fetchOrders() {
    fetch("http://127.0.0.1:8000/ord/" + this.state.user_id + "/")
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
  renderItemComponent = (data) => (
    <OrderComponent
      order_id={data.item.order_id}
      date={data.item.date}
      total_price={data.item.total_price}
      adress={data.item.adress}
      navigation={this.props.navigation}
    />
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
            title="< Orders"
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
    backgroundColor: "#f2f2f2",
  },

  goBackButton: {
    marginTop: 15,
    height: 45,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  separator: {
    height: 0.2,
    backgroundColor: "grey",
    marginTop: 5,
    marginHorizontal: 20,
  },
});
