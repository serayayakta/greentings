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
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import Category from "./Category";

class Search extends Component {
  componentWillMount() {
    //for android view to be ok, may cause issues
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: this.startHeaderHeight,
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
              <Icon name="ios-search" size={20} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Search here"
                placeholderTextColor="grey"
                style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
              />
            </View>
          </View>
          <ScrollView scrollEventThrottle={16}>
            <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
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
                    <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                      <Text>Fashion</Text>
                    </View>
                  </View>

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
                    <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                      <Text>Accessories</Text>
                    </View>
                  </View>
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
                    <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                      <Text>Interior</Text>
                    </View>
                  </View>
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
                    <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                      <Text>Beauty/Skincare</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
