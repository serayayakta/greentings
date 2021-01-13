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
      user_id: "0",
      nickname: "",
      rating: "",
      text: "",
      first_name: "",
      last_name: "",
      email: "",
      dataSource: [],
      starCount: 0,
      user_exists: "0",
    };
  }
  async getUserExists() {
    try {
      const value = await AsyncStorage.getItem("@user_exists");
      this.setState({ user_exists: value });
    } catch (e) {
      console.log("error in value user_exists /profile page/", e);
    }
  }
  onStarRatingPress(value) {
    this.setState({
      starCount: value,
    });
    console.log(this.state.starCount);
    this.setState({
      rating: JSON.stringify(this.state.starCount),
    });
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
      nickname: this.state.dataSource.first_name,
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
    this.getUserExists();
    console.log(this.props.product_id);
    this.fetchComments();
    this.fetchUserInfo();
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
      this.fetchUserInfo();
    }); // call fetchCats after setting the state
  };
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <Button
            title={"< " + this.props.navigation.getParam("screen", "no id")}
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
          <View style={styles.commentcontainer}>
            <View style={styles.menuWrapper}>
              <View style={styles.menuItem}>
                <Text style={{ marginLeft: 10 }}>
                  {this.state.dataSource.first_name}
                </Text>
              </View>
              <View style={styles.separator}></View>
              <View style={styles.menuItem}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  starSize={14}
                  fullStarColor={"darkgreen"}
                  rating={this.state.starCount}
                  value={JSON.stringify(this.state.starCount)}
                  selectedStar={(value) => {
                    this.setState({ starCount: value });
                    this.setState({ rating: value });
                    console.log(this.state.starCount);
                    console.log("rating", this.state.rating);
                  }}
                />
              </View>
              <View style={styles.separator}></View>

              <View>
                <View style={styles.menuItem}>
                  <TextInput
                    placeholder="Comments..."
                    placeholderTextColor="grey"
                    style={styles.inputText}
                    autoCorrect={false}
                    onChangeText={(txt) => {
                      this.setState({ text: txt }),
                        console.log("comment", this.state.text);
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

  async fetchUserInfo() {
    var raw = JSON.stringify({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
    });

    try {
      const user_id = await AsyncStorage.getItem("@user_id");
      if (user_id !== null) {
        fetch("http://127.0.0.1:8000/user/" + user_id + "/")
          .then((response) => response.json())
          .then((result) => {
            this.setState({
              dataSource: result,
              refreshing: false,
            });
            console.log(result);
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
    height: 20,
    width: 30,
    borderRadius: 40,
    borderColor: "#778899",
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
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

    marginHorizontal: 30,
  },
  commentBtn: {
    width: "30%",
    //backgroundColor: `#9acd32`,
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
  },
  commentcontainer: {
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
});
export default withNavigation(ProductDetailScreen);
