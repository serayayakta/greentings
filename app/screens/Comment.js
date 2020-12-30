import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "react-native-star-rating";

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
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.props.rating}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            fullStarColor={"darkgreen"}
            starSize={14}
          ></StarRating>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text_user}>{this.props.nickname} | </Text>
          <Text style={styles.text_user}>{this.props.date} | </Text>
          <Text style={styles.text_user}>comment {this.props.comment_id}</Text>
        </View>
        <Text style={styles.text_comment}>
          for product {this.props.product}:
        </Text>
        <View>
          <Text style={styles.text_comment}>{this.props.text}</Text>
        </View>
        <Text style={{ alignSelf: "flex-end", fontSize: 10 }}>
          validation:{" "}
          {JSON.stringify(
            navigation.getParam("validation", this.props.validation)
          )}
        </Text>
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
  text_user: {
    fontFamily: "Helvetica Neue",
    textAlign: "left",
    fontSize: 14,
    color: "grey",
  },
  text_comment: {
    fontFamily: "Helvetica Neue",
    textAlign: "left",
    fontSize: 14,
    color: "black",
  },
});

export default withNavigation(Comment);
