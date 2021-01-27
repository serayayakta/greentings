import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "./Product";
import Icon from "react-native-vector-icons/Fontisto";

export default class ForYouScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      user_id: "",
      code: "",
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id in profile", value);
        this.setState({ user_id: value });
      } else {
        console.log("value of id is null");
      }
    } catch (e) {
      console.log("error in value id ", e);
    }
  }
  componentDidMount() {
    this.getId();
    this.fetchProductsForYou();
  }
  async fetchProductsForYou() {
    try {
      const user_id = await AsyncStorage.getItem("@user_id");
      if (user_id !== null) {
        fetch("http://127.0.0.1:8000/ml/" + user_id + "/")
          .then((response) => response.json())
          .then((result) => {
            this.setState({
              dataSource: result,
              refreshing: false,
            });
          })
          .catch((error) => console.log("fetch error", error));
      } else {
        console.log("user_id is null");
      }
    } catch (e) {
      console.log("error in value user_id ", e);
    }
  }
  renderItemComponent = (data) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        this.props.navigation.navigate("ProductDetailScreen", {
          product_id: data.item.product_id,
          img: data.item.img,
          brande_name: data.item.brand_name,
          product_name: data.item.product_name,
          rating: data.item.rating,
          base_price: data.item.base_price,
          discount: data.item.discount,
          price: data.item.price,
          description: data.item.description,
          navigation: this.props.navigation,
          user_id: this.state.user_id,
          screen: "Home",
          stock: data.item.stock,
        });
      }}
    >
      <Product
        onUpdate={this.handleUpdate}
        product={data.item}
        product_id={data.item.product_id}
        img={data.item.img}
        brand_name={data.item.brand_name}
        product_name={data.item.product_name}
        rating={data.item.rating}
        price={data.item.price}
        navigation={this.props.navigation}
        description={data.item.description}
        base_price={data.item.base_price}
        discount={data.item.discount}
      />
      <View styles={{ flex: 1, width: "80%" }}>
        {
          //if we add favorites feature
          false && (
            <TouchableOpacity style={{ width: "10%" }}>
              <Image
                style={styles.iconContainer}
                source={require("../assets/icon_heart.png")}
              />
            </TouchableOpacity>
          )
        }
        {data.item.stock <= 0 && (
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "flex-end",
              alignSelf: "flex-end",
              bottom: 30,
            }}
          >
            <Text>SOLD</Text>
            <Text>OUT</Text>
          </View>
        )}
        {data.item.stock > 0 && (
          <TouchableOpacity
            style={{ width: "10%", alignSelf: "flex-end" }}
            activeOpacity={0.5}
            onPress={() => {
              this.handleUpdate();
              this.addToBasket(data.item.product_id);
            }}
          >
            <Icon
              name="shopping-basket-add"
              size={20}
              style={styles.iconContainer2}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
  addToBasket = (product_id) => {
    this.getId().then(console.log("getid worked."));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ product: product_id, quantity: 1 });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://127.0.0.1:8000/basket/" + this.state.user_id + "/",
      requestOptions
    )
      .then((response) => {
        console.log("response status for add to basket", response.status);
        if (response.status == 201) {
          response.json().then((data) => {
            console.log("data of add to basket home : ", data);
            console.log("user id: ", data[0].user_id);
            console.log("state new_user: ", this.state.new_user);
            console.log("bool user_exists: ", data[0].user_exists);

            if (this.state.user_id == "0") {
              console.log("new user added the first item.");
            }
            const user_id = data[0].user_id.toString();
            this.setId(user_id);
            console.log("new user id is: ", this.state.user_id);
            this.handleUpdate();
          });
        }
      })
      .then(() => this.handleUpdate())
      .catch((error) => console.log("fetch error", error));
  };
  render() {
    const { navigation } = this.props;
    return (
      <View>
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
            keyExtractor={(item) => item.product_id.toString()}
            ItemSeparatorComponent={this.ItemSeparator}
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
  loginBtn: {
    width: "80%",
    //backgroundColor: `#9acd32`,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: colors.primary,
  },
  btnText: {
    color: "white",
  },
});
