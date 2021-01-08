import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Fontisto";
import Product from "./Product";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "./Category";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchKey: "",
      refreshing: true,
      searchUrl: "http://127.0.0.1:8000/search/?search=",
      value: "",
      user_id: "0",
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id / search page / ", value);
        this.setState({ user_id: value });
      } else {
        console.log("value of id is null / search page / ");
      }
    } catch (e) {
      console.log("error in value id / search page /", e);
      // error reading value
    }
  }
  searchFunc = (searchKey) => {
    console.log(searchKey);
  };
  state = {
    seachKey: "",
  };
  handleSearchkey = (text) => {
    this.setState({ searchKey: text });
  };
  /*componentDidMount() {
    this.fetchProducts();
  }*/

  fetchProducts() {
    fetch(this.state.searchUrl)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          dataSource: result,
          refreshing: false,
        });
      })
      .catch((error) => console.log("fetch error", error));
  }
  fetchCategoryItems(id) {
    if (id == 1) {
      fetch("http://127.0.0.1:8000/categoryitems/5/")
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            dataSource: result,
            refreshing: false,
          });
        })
        .catch((error) => console.log("fetch error", error));
    }
    if (id == 2) {
      fetch("http://127.0.0.1:8000/categoryitems/6/")
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            dataSource: result,
            refreshing: false,
          });
        })
        .catch((error) => console.log("fetch error", error));
    }
    if (id == 4) {
      fetch("http://127.0.0.1:8000/categoryitems/8/")
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            dataSource: result,
            refreshing: false,
          });
        })
        .catch((error) => console.log("fetch error", error));
    }
  }

  renderItemComponent = (data) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
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
            user_id: this.state.user_id,
            screen: "Continue searching",
          });
        }}
      >
        <Product
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
      </TouchableOpacity>
      <View
        styles={{
          width: "80%",
          flexDirection: "row",
          height: "10%",
        }}
      >
        {
          //if we add favorites feature
          false && (
            <TouchableOpacity style={{ width: 50 }}>
              <Image
                style={styles.iconContainer}
                source={require("../assets/icon_heart.png")}
              />
            </TouchableOpacity>
          )
        }
        <View
          style={{
            height: 30,
            marginBottom: 40,
            bottom: 20,
            width: 50,
            alignSelf: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
            activeOpacity={0.5}
            onPress={() => {
              console.log(
                "user id in add to basket /search page/",
                this.state.user_id
              );
              this.addToBasket(this.state.user_id, data.item.product_id);
            }}
          >
            <Icon
              name="shopping-basket-add"
              size={20}
              style={styles.iconContainer2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  componentDidMount() {
    this.getId();
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: "#dddddd",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  backgroundColor: "white",
                  marginHorizontal: 20,
                  shadowOffset: { width: 0, height: 0 }, //might not work w android,
                  shadowColor: "black",
                  shadowOpacity: 0.2,
                  elevation: 1, //for android
                  MarginTop: Platform.OS == "android" ? 30 : null,
                }}
              >
                <TextInput
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                  placeholder="Search here"
                  placeholderTextColor="grey"
                  style={{
                    flex: 1,
                    fontWeight: "700",
                    backgroundColor: "white",
                  }}
                  onChangeText={(text) => {
                    this.setState({ searchKey: text });
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.searchResult(this.state.searchKey)}
                >
                  <Icon name="search" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView scrollEventThrottle={16}>
              <View
                style={{ flex: 1, backgroundColor: "white", paddingTop: 10 }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                    fontFamily: "Helvetica Neue",
                  }}
                >
                  Categories
                </Text>

                <View
                  style={{
                    height: 120,
                  }}
                >
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.fetchCategoryItems(1)}
                    >
                      <View
                        style={{
                          height: 130,
                          width: 130,
                          marginLeft: 20,
                          borderBottomWidth: 0.5,
                          borderColor: "#dddddd",
                        }}
                      >
                        <View style={{ flex: 2 }}>
                          <Image
                            source={require("../assets/feature-block-1-image.jpg")}
                            style={{
                              flex: 1,
                              height: null,
                              width: null,
                              resizeMode: "cover",
                            }}
                          />
                        </View>
                        <View
                          style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}
                        >
                          <Text>Clothing</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.fetchCategoryItems(2)}
                    >
                      <View
                        style={{
                          height: 130,
                          width: 130,
                          marginLeft: 20,
                          borderBottomWidth: 0.5,
                          borderColor: "#dddddd",
                        }}
                      >
                        <View style={{ flex: 2 }}>
                          <Image
                            source={require("../assets/categ1.jpeg")}
                            style={{
                              flex: 1,
                              height: null,
                              width: null,
                              resizeMode: "cover",
                            }}
                          />
                        </View>
                        <View
                          style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}
                        >
                          <Text>Accessories</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.fetchCategoryItems(4)}
                    >
                      <View
                        style={{
                          height: 130,
                          width: 130,
                          marginLeft: 20,
                          borderBottomWidth: 0.5,
                          borderColor: "#dddddd",
                        }}
                      >
                        <View style={{ flex: 2 }}>
                          <Image
                            source={require("../assets/b9579863bcfbdc7596a12aebc8d567ae.jpg")}
                            style={{
                              flex: 1,
                              height: null,
                              width: null,
                              resizeMode: "cover",
                            }}
                          />
                        </View>
                        <View
                          style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}
                        >
                          <Text>Technology</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.1, backgroundColor: "white" }}>
            <RNPickerSelect
              placeholder={{ label: "Sort by:", color: "black" }}
              onValueChange={(param) => {
                //console.log("log sort value", param);
                this.sortResult(this.state.searchKey, param);
              }}
              items={[
                { label: "Price descending", value: "-price" },
                { label: "Price ascending", value: "price" },
                { label: "Rating descending", value: "-rating" },
                { label: "Rating ascending", value: "rating" },
              ]}
            />
          </View>
          <View style={{ flex: 2.5 }}>
            <ScrollView>
              <FlatList
                data={this.state.dataSource}
                //ListHeaderComponent={this.FlatListHeader}
                renderItem={(item) => this.renderItemComponent(item)}
                keyExtractor={(item) => item.product_id.toString()}
                ItemSeparatorComponent={this.ItemSeparator}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              ></FlatList>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  addToBasket = (user_id, product_id) => {
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
    console.log(user_id);
    fetch("http://127.0.0.1:8000/basket/" + user_id + "/", requestOptions)
      .then((response) => {
        console.log(
          "response status for add to basket in search",
          response.status
        );
        if (response.status == 201) {
          response.json().then((data) => {
            console.log("data for add to basket in search: ", data);
            console.log("user id: ", data[0].user_id);
            console.log("state new_user: ", this.state.new_user);
            console.log("bool user_exists: ", data[0].user_exists);
          });
        }
      })
      .catch((error) => console.log("fetch error", error));
  };
  searchResult = (searchKey) => {
    const fetchUrl = "http://127.0.0.1:8000/search/?search=";
    this.setState({ searchUrl: fetchUrl + this.state.searchKey }, () => {
      this.fetchProducts();
    });
    console.log("Enter searchResult", searchKey);
  };
  sortResult = (searchKey, param) => {
    const fetchUrl = "http://127.0.0.1:8000/search/?search=";
    this.setState(
      {
        searchUrl: fetchUrl + this.state.searchKey + "&ordering=" + param,
      },
      () => {
        this.fetchProducts();
      }
    );
    console.log("Enter sortResult", searchKey);
    console.log("Enter sortResult", param);
  };
}

export default Search;

const styles = StyleSheet.create({
  aboutUs: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 10,
    textDecorationLine: "underline",
  },
  container: {
    height: 300,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
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
    height: 40,
    position: "absolute",
    flex: 1,
  },
  image: {
    borderRadius: 4,
    flex: 1,
    justifyContent: "center",
  },
  slogan: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 10,
    fontFamily: "Helvetica Neue",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontFamily: "Helvetica Neue",
    fontWeight: "bold",
    textAlign: "center",
    //backgroundColor: "#004d4d",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 10,
  },
  topLogoArea: {
    height: "20%",
  },
});
