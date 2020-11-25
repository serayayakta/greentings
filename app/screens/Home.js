import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

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
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={{ uri: data.item.img }} />
    </TouchableOpacity>
  );
  ItemSeparator = () => (
    <View
      style={{
        height: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  );
  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.fetchProducts();
    }); // call fetchCats after setting the state
  };

  render() {
    const productsJSON = this.state.dataSource;
    const products = JSON.stringify(productsJSON);
    console.log(products);
    const Item = ({ product_id }) => (
      <View>
        <Text>{product_id}</Text>
      </View>
    );

    return (
      <SafeAreaView>
        <FlatList
          data={this.state.dataSource}
          renderItem={(item) => this.renderItemComponent(item)}
          keyExtractor={(item) => item.product_id.toString()}
          ItemSeparatorComponent={this.ItemSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </SafeAreaView>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 10,
    backgroundColor: "#FFF",
    borderRadius: 6,
  },
  image: {
    height: "100%",
    borderRadius: 4,
  },
});
