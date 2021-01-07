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
import { withNavigation } from "react-navigation";
import colors from "../config/colors";
import Comment from "./Comment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "react-native-star-rating";

class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      refreshing: false,
      user_id: "1",
      nickname: "",
      rating: "",
      text: "",
    };
  }

  clickEventListener() {
    Alert.alert("Success", "Product has beed added to cart");
  }

  async getId() {
    try {
      const user_id = await AsyncStorage.getItem("@user_id");
      if (user_id !== null) {
        this.setState({ user_id: user_id.toString() });
      } else {
        console.log("value of user_id is null");
      }
    } catch (e) {
      console.log("error in value user_id ", e);
    }
  }

  fetchComments() {
    fetch(
      "http://127.0.0.1:8000/comments/" +
        JSON.stringify(this.props.navigation.getParam("product_id", "no id")) +
        "/"
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          comments: result,
          refreshing: false,
        });
        console.log(result);
      })
      .catch((error) => console.log("fetch error", error));
  }
  addComment = () => {
    console.log("nick in addComm", this.state.nickname);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    this.getId();
    var raw = JSON.stringify({
      nickname: this.state.nickname,
      user_id: this.state.user_id,
      text: this.state.text,
      rating: this.state.rating,
      validation: "false",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("nick in addComm", raw);
    fetch(
      "http://127.0.0.1:8000/comments/" +
        JSON.stringify(this.props.navigation.getParam("product_id", "no id")) +
        "/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error"));

    this.setState({ nickname: "" });
  };
  componentDidMount() {
    this.getId();
    console.log(this.props.product_id);
    this.fetchComments();
  }
  renderItemComponent = (data) => (
    <Comment
      comment_id={data.item.comment_id}
      date={data.item.date}
      nickname={data.item.nickname}
      product={data.item.product}
      rating={data.item.rating}
      text={data.item.text}
      validation={data.item.validation}
      navigation={this.props.navigation}
    />
  );
  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.fetchComments();
    }); // call fetchCats after setting the state
  };
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <Button
            title="< Products"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <ScrollView>
          <Image
            style={styles.productImg}
            source={{
              uri: navigation.getParam("img"),
            }}
          />
          <View style={styles.box}>
            <Text style={styles.name}>
              {JSON.stringify(navigation.getParam("product_name", "no name"))}
            </Text>
            {navigation.getParam("discount", "false") == true && (
              <Text style={styles.oldPrice}>
                ${" "}
                {JSON.stringify(navigation.getParam("base_price", "no price"))}
              </Text>
            )}
            <Text style={styles.price}>
              $ {JSON.stringify(navigation.getParam("price", "no price"))}
            </Text>
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={navigation.getParam("rating", "0")}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                fullStarColor={"darkgreen"}
                starSize={20}
              ></StarRating>
            </View>
            <Text style={styles.description}>
              {navigation.getParam("description", "no description")}
            </Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCartContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.addToBasket()}
            >
              <Text style={styles.addButtonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <TextInput
                placeholder="nickname"
                onChangeText={(text) => {
                  this.setState({ nickname: text }),
                    console.log("nick", this.state.nickname);
                }}
              />
            </View>
            <View>
              <TextInput
                placeholder="comment"
                onChangeText={(txt) => {
                  this.setState({ text: txt }),
                    console.log("comment", this.state.text);
                }}
              />
            </View>
            <View>
              <TextInput
                placeholder="rating"
                onChangeText={(text) => {
                  this.setState({ rating: text }),
                    console.log("rating", this.state.rating);
                }}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.commentBtn}
                onPress={this.addComment}
              >
                <Text style={styles.btnText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={this.state.comments}
            renderItem={(item) => this.renderItemComponent(item)}
            keyExtractor={(item) => item.comment_id.toString()}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          ></FlatList>
        </ScrollView>
      </View>
    );
  }

  addToBasket = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const product_id = JSON.stringify(
      this.props.navigation.getParam("product_id", "no id")
    );

    var raw = JSON.stringify({ product: product_id });
    //console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    this.getId();
    fetch(
      "http://127.0.0.1:8000/basket/" + this.state.user_id + "/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error"));
  };
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCartContainer: {
    marginHorizontal: 30,
  },
  box: {
    alignItems: "center",
    margin: 30,
    position: "relative",
    flex: 1,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 25,
    marginHorizontal: 3,
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
  contentColors: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  contentSize: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#f2f2f2",
  },
  description: {
    textAlign: "center",
    marginTop: 10,
    color: "black",
  },
  goBackButton: {
    marginTop: 15,
    height: 45,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    color: "#696969",
    fontWeight: "bold",
  },
  oldPrice: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "line-through",
    textDecorationColor: "red",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  productImg: {
    height: 300,
    resizeMode: "contain",
  },
  star: {
    width: 40,
    height: 40,
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30,
  },
  commentBtn: {
    width: "40%",
    //backgroundColor: `#9acd32`,
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: colors.primary,
  },
});
export default withNavigation(ProductDetailScreen);
