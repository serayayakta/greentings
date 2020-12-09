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

import Icon from "react-native-vector-icons/Ionicons";
import Product from "./Product";
import Category from "./Category";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchKey: "",
      refreshing: true,
      searchUrl: "http://127.0.0.1:8000/search/?search=",
    };
  }
  componentWillMount() {
    //for android view to be ok, may cause issues
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
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
      fetch("http://127.0.0.1:8000/categoryitems/1/")
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
      fetch("http://127.0.0.1:8000/categoryitems/2/")
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            dataSource: result,
            refreshing: false,
          });
        })
        .catch((error) => console.log("fetch error", error));
    }
    if (id == 3) {
      fetch("http://127.0.0.1:8000/categoryitems/3/")
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
      fetch("http://127.0.0.1:8000/categoryitems/4/")
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
    <Product
      img={data.item.img}
      brand_name={data.item.brand_name}
      product_name={data.item.product_name}
      rating={data.item.rating}
      price={data.item.price}
    />
  );
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: 50,
                backgroundColor: "white",
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
                  <Icon name="ios-search" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView scrollEventThrottle={16}>
              <View
                style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    paddingHorizontal: 20,
                  }}
                >
                  What can we help you find Ilgin?
                </Text>

                <View style={{ height: 130, MarginTop: 20 }}>
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
                            source={require("../assets/categ2.jpeg")}
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
                          <Text>Home</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.fetchCategoryItems(3)}
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
                            source={require("../assets/categ3.jpeg")}
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
                          <Text>Furniture</Text>
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
                          <Text>Cosmetics</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 2 }}>
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
  searchResult = (searchKey) => {
    const fetchUrl = "http://127.0.0.1:8000/search/?search=";
    this.setState({ searchUrl: fetchUrl + this.state.searchKey }, () => {
      this.fetchProducts();
    });
    console.log("Enter searchResult", searchKey);
  };
}
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
    margin: 10,
    backgroundColor: "#FFF",
    borderRadius: 6,
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
