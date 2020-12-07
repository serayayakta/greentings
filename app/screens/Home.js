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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
    };
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
  componentDidMount() {
    this.fetchProducts();
  }
  renderItemComponent = (data) => (
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
    />
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
  ItemSeparator = () => (
    <View
      style={{
        height: 0.1,
        backgroundColor: "rgba(0,0,0,0.5)",
        marginLeft: 30,
        marginRight: 30,
      }}
    />
  );
  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.fetchProducts();
    }); // call fetchCats after setting the state
  };

  render() {
    //const productsJSON = this.state.dataSource;
    //const products = JSON.stringify(productsJSON);
    //console.log(products);

    const Item = ({ product_id }) => (
      <View>
        <Text>{product_id}</Text>
      </View>
    );

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
            onRefresh={this.handleRefresh}
          ></FlatList>
        </ScrollView>
      </View>
    );
  }
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
