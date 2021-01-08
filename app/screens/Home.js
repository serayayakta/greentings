import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Product from "./Product";

import Icon from "react-native-vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      user_id: "",
      new_user: true,
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id / home page / ", value);
        this.setState({ user_id: value });
        this.setState({ refreshing: false, user_id: value });
        if (value == "0") {
          this.setState({ new_user: true });
        } else {
          this.setState({ new_user: false });
        }
      } else {
        console.log("value of id is null / home page / ");
      }
    } catch (e) {
      console.log("error in value id / home page /", e);
      // error reading value
    }
  }
  async setId(user_id) {
    try {
      this.setState({ user_id: user_id });
      await AsyncStorage.setItem("@user_id", user_id);
    } catch (e) {
      console.log("error", e);
    }
  }
  fetchProducts() {
    fetch("http://127.0.0.1:8000/product/")
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          dataSource: result,
          refreshing: false,
        });
      })
      .catch((error) => console.log("fetch error", error));
  }

  handleUpdate = () => {
    console.log(
      "handle update: add to basket is pressed from product component /home page/"
    );
    this.getId();
  };

  handleRefresh = () => {
    this.getId();
    this.setState({ refreshing: true }, () => {
      this.fetchProducts();
    });
  };
  refresh = () => {
    this.getId();
  };
  componentDidMount() {
    this.getId();
    this.fetchProducts();
    const { navigation } = this.props;
    navigation.addListener(
      "willFocus",
      () => this.handleRefresh()
      // run function that updates the data on entering the screen
    );
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
  FlatListHeader = () => {
    const image = {
      uri:
        "https://cdn.discordapp.com/attachments/762783578710343686/781149405859282974/960x640-greenland_1579380596.jpg",
    };
    return (
      <View
        elevation={1}
        style={{
          height: 300,
          width: "100%",
          marginBottom: 5,
          border: 2.9,
          borderColor: "black",
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.8,
          shadowRadius: 7.49,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <ImageBackground
          source={{
            uri:
              "https://cdn.discordapp.com/attachments/762783578710343686/781149405859282974/960x640-greenland_1579380596.jpg",
          }}
          style={styles.image}
        >
          <Text style={styles.text}>Greentings</Text>
          <Text style={styles.slogan}>
            Reproduced | Safe | Clean | Green | Happy
          </Text>
          <TouchableOpacity>
            <Text style={styles.aboutUs}>About Us</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };
  ItemSeparator = () => <View />;

  render() {
    //const productsJSON = this.state.dataSource;
    //const products = JSON.stringify(productsJSON);
    //console.log(products);

    return (
      <View>
        <ScrollView>
          <FlatList
            data={this.state.dataSource}
            ListHeaderComponent={this.FlatListHeader}
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
}
export default Home;

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
    marginVertical: 10,
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
    right: 10,
    height: 40,
    width: 40,
    position: "absolute",
    right: -5,
    top: -30,
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
    marginTop: 7,
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
