import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "react-native-star-rating";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "0",
      new_user: true,
    };
  }
  async setId(user_id) {
    () => this.setState({ user_id: user_id, new_user: false });
    try {
      await AsyncStorage.setItem("@user_id", this.state.user_id);
    } catch (e) {
      console.log("error", e);
    }
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id in basket", value);
        this.setState({ user_id: value });
        if (value == "0") {
          this.setState({ new_user: true });
        } else {
          this.setState({ new_user: false });
        }
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
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            // Navigate using the `navigation` prop that you received
            this.props.navigation.navigate("ProductDetailScreen", {
              product_id: this.props.product_id,
              img: this.props.img,
              brande_name: this.props.brand_name,
              product_name: this.props.product_name,
              rating: this.props.rating,
              base_price: this.props.base_price,
              discount: this.props.discount,
              price: this.props.price,
              description: this.props.description,
              navigation: this.props.navigation,
            });
          }}
        >
          <View styles={{ height: "100%" }}>
            <View styles={{ flex: 3 }}>
              <Image style={styles.image} source={{ uri: this.props.img }} />
            </View>
            <View styles={{ flex: 3 }}>
              <Text style={styles.text}>{this.props.product_name}</Text>
              <Text style={styles.brandName}>{this.props.brand_name}</Text>
              {this.props.discount == true && (
                <Text style={styles.oldPrice}>${this.props.base_price}</Text>
              )}
              <Text style={styles.price}>price: ${this.props.price}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.props.rating}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                fullStarColor={"darkgreen"}
                starSize={14}
              ></StarRating>
            </View>
            <View styles={{ flex: 1, width: "80%" }}>
              <TouchableOpacity style={{ width: "10%" }}>
                <Image
                  style={styles.iconContainer}
                  source={require("../assets/icon_heart.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "10%", alignSelf: "flex-end" }}
                activeOpacity={0.5}
                onPress={() => this.addToBasket()}
              >
                <Icon
                  name="shopping-basket-add"
                  size={20}
                  style={styles.iconContainer2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  addToBasket = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ product: this.props.product_id, quantity: 1 });
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
            console.log("data: ", data);
            console.log("new user id: ", data[0].user_id);
            console.log("bool user_exists: ", data[0].user_exists);
            if (this.state.new_user) {
              console.log("new user added the first item.");
              const user_id = data[0].user_id.toString();
              this.setId(user_id);
              console.log("new user id is: ", this.state.user_id);
            }
          });
        }
      })
      .catch((error) => console.log("fetch error", error));
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
    height: 190,
    borderRadius: 4,
  },
  oldPrice: {
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "line-through",
    textDecorationColor: "red",
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
  price: {
    color: "black",
    fontWeight: "bold",
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
  text: {
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
});

export default withNavigation(Product);
