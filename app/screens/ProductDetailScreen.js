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
} from "react-native";

import colors from "../config/colors";

export default class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  clickEventListener() {
    Alert.alert("Success", "Product has beed added to cart");
  }

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
          <View style={styles.box}>
            <Image
              style={styles.productImg}
              source={{
                uri: navigation.getParam("img"),
              }}
              resizeMode={"cover"}
            />
            <Text style={styles.name}>
              {JSON.stringify(navigation.getParam("product_name", "no name"))}
            </Text>
            <Text style={styles.price}>$ 12.22</Text>
            <Text>
              image url
              {JSON.stringify(
                navigation.getParam(
                  "img",
                  "https://unsplash.com/a/img/empty-states/photos.png"
                )
              )}
            </Text>
            <Text style={styles.description}>
              {navigation.getParam("description", "no description")}
            </Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCartContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.clickEventListener()}
            >
              <Text style={styles.addButtonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
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
    fontSize: 28,
    color: "#696969",
    fontWeight: "bold",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  productImg: {
    height: "50%",
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
});
