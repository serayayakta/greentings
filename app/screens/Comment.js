import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 1,
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id in comment", value);
        this.setState({ user_id: value });
        // value previously stored
      } else {
        console.log("value of id is null");
      }
    } catch (e) {
      console.log("error in value id ", e);
      // error reading value
    }
  }
  componentDidMount() {
    this.getId();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>comment id {this.props.comment_id}</Text>
        <Text style={styles.text}> date{this.props.date}</Text>
        <Text style={styles.text}>nickname {this.props.nickname}</Text>
        <Text style={styles.text}>product {this.props.product}</Text>
        <Text style={styles.text}>rating {this.props.rating}</Text>
        <Text style={styles.text}>text {this.props.text}</Text>
        <Text style={styles.text}>validation {this.props.validation}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  brandName: {
    textTransform: "uppercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
    marginBottom: 8,
  },
  container: {
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
    height: 200,
    borderRadius: 4,
  },
  text: {
    textTransform: "lowercase",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
  },
});

export default withNavigation(Comment);
