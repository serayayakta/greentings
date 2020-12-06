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
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.goBackButton}>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>

        <ScrollView>
          <View style={styles.box}>
            <Image
              style={styles.productImg}
              source={{
                uri:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v7KDJN7TAoJa5sFaPWcp1HX8JFcpF3z5K3ngz4L6kWoEP7Ca",
              }}
            />
            <Text style={styles.name}>Super Soft T-Shirt</Text>
            <Text style={styles.price}>$ 12.22</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec
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
      </SafeAreaView>
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
    backgroundColor: "white",
  },
  description: {
    textAlign: "center",
    marginTop: 10,
    color: "#696969",
  },
  goBackButton: {
    marginTop: 15,
    height: 45,
    backgroundColor: colors.secondary,
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
    width: 200,
    height: 200,
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
