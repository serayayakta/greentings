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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import colors from "../config/colors";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Fontisto";
import Product from "./Product";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "./Category";

var radio_props = [
  { label: "1 or above", value: 1 },
  { label: "2 or above", value: 2 },
  { label: "3 or above", value: 3 },
  { label: "4 or above", value: 4 },
];
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      brand_name: [],
      searchKey: "",
      refreshing: true,
      searchUrl: "http://127.0.0.1:8000/search/?search=",
      value: "",
      user_id: "0",
      price_lower: 0,
      price_upper: 10000,
      rating: 0,
      categ_id: 0,
      filter_show: false,
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
    this.setState({ categ_id: id });
    console.log(this.state.categ_id);
    if (id == 5) {
      fetch("http://127.0.0.1:8000/categoryitems/5/")
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            dataSource: result,
            refreshing: false,
          });
          fetch("http://127.0.0.1:8000/categorynames/5")
            .then((response) => response.json())
            .then((result) => {
              this.setState({
                brand_name: result,
                refreshing: false,
              });
              console.log(this.state.brand_name);
            })
            .catch((error) => console.log("fetch error", error));
        })
        .catch((error) => console.log("fetch error", error));
    }
    if (id == 6) {
      fetch("http://127.0.0.1:8000/categoryitems/6/")
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            dataSource: result,
            refreshing: false,
          });
          fetch("http://127.0.0.1:8000/categorynames/6")
            .then((response) => response.json())
            .then((result) => {
              this.setState({
                brand_name: result,
                refreshing: false,
              });
            })
            .catch((error) => console.log("fetch error", error));
        })
        .catch((error) => console.log("fetch error", error));
    }
    if (id == 8) {
      fetch("http://127.0.0.1:8000/categoryitems/8/")
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            dataSource: result,
            refreshing: false,
          });
          fetch("http://127.0.0.1:8000/categorynames/8")
            .then((response) => response.json())
            .then((result) => {
              this.setState({
                brand_name: result,
                refreshing: false,
              });
            })
            .catch((error) => console.log("fetch error", error));
        })
        .catch((error) => console.log("fetch error", error));
    }
    if (id == 11) {
      fetch("http://127.0.0.1:8000/categoryitems/11/")
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            dataSource: result,
            refreshing: false,
          });

          fetch("http://127.0.0.1:8000/categorynames/11")
            .then((response) => response.json())
            .then((result) => {
              this.setState({
                brand_name: result,
                refreshing: false,
              });
              console.log(result);
            })
            .catch((error) => console.log("fetch error", error));
        })
        .catch((error) => console.log("fetch error", error));
    }
    if (id == 12) {
      fetch("http://127.0.0.1:8000/categoryitems/12/")
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            dataSource: result,
            refreshing: false,
          });
          fetch("http://127.0.0.1:8000/categorynames/12")
            .then((response) => response.json())
            .then((result) => {
              this.setState({
                brand_name: result,
                refreshing: false,
              });
            })
            .catch((error) => console.log("fetch error", error));
        })
        .catch((error) => console.log("fetch error", error));
    }
  }

  fetchFilter() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      brand_name: [],
      price_lower: this.state.price_lower,
      price_upper: this.state.price_upper,
      rating: this.state.rating,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    var i = this.state.categ_id.toString();
    console.log(i);
    fetch("127.0.0.1:8000/categoryitems/" + i + "/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  renderItemComponent = (data) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
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
            navigation: data.item.navigation,
            user_id: data.item.user_id,
            screen: "Continue searching",
            stock: data.item.stock,
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
          stock={data.item.stock}
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
          {data.item.stock <= 1 && (
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                alignSelf: "flex-end",
                bottom: 10,
              }}
            >
              <Text>SOLD</Text>
              <Text>OUT</Text>
            </View>
          )}
          {data.item.stock > 1 && (
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
          )}
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
                      onPress={() => this.fetchCategoryItems(5)}
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
                      onPress={() => this.fetchCategoryItems(6)}
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
                      onPress={() => this.fetchCategoryItems(8)}
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
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.fetchCategoryItems(11)}
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
                            source={require("../assets/categ4.jpeg")}
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
                          <Text>Body Care</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.fetchCategoryItems(12)}
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
                            source={require("../assets/kitchen.jpg")}
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
                          <Text>Kitchen</Text>
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
          {
            (this.state.filter_show = false && (
              <View>
                <Text>Price range</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "10%" }}>
                    <TextInput
                      placeholder="min"
                      placeholderTextColor="grey"
                      style={styles.inputText}
                      autoCorrect={false}
                      onChangeText={(text) => {
                        this.setState({ price_lower: text }),
                          console.log("hey", this.state.price_lower);
                      }}
                    />
                  </View>
                  <Text>—</Text>
                  <View style={{ width: "10%" }}>
                    <TextInput
                      placeholder="max"
                      placeholderTextColor="grey"
                      style={styles.inputText}
                      autoCorrect={false}
                      onChangeText={(text) => {
                        this.setState({ price_upper: text }),
                          console.log("hey", this.state.price_upper);
                      }}
                    />
                  </View>
                </View>
                <View style={styles.separator}></View>
                <Text>Select rating:</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "60%" }}>
                    <RadioForm
                      radio_props={radio_props}
                      initial={0}
                      buttonColor={"black"}
                      buttonSize={10}
                      buttonOuterSize={20}
                      onPress={(value) => {
                        this.setState({ rating: value }),
                          console.log(this.state.rating);
                      }}
                    />
                  </View>
                  <View style={{ width: "40%" }}>
                    <TouchableOpacity
                      style={styles.commentBtn}
                      onPress={() => this.fetchFilter()}
                    >
                      <Text style={styles.btnText}>Filter</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          }
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
  commentBtn: {
    width: "50%",
    //backgroundColor: `#9acd32`,
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: colors.primary,
    alignSelf: "center",
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
  separator: {
    height: 0.2,
    backgroundColor: "grey",
    marginTop: 5,
    marginHorizontal: 20,
  },
  btnText: {
    color: "white",
  },
});
