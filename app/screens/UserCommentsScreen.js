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
  TextInput,
} from "react-native";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Comment from "./Comment";

export default class UserCommentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      user_id: "",
      comments: [],
      comment_id: "",
      date: "",
      nickname: "",
      product: "",
      rating: "",
      text: "",
      validation: "",
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id in profile", value);
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
    this.fetchComments();
  }
  async fetchComments() {
    var raw = JSON.stringify({
      comment_id: this.state.comment_id,
      date: this.state.date,
      nickname: this.state.nickname,
      product: this.state.product,
      rating: this.state.rating,
      text: this.state.text,
      validation: this.state.validation,
    });

    try {
      const user_id = await AsyncStorage.getItem("@user_id");
      if (user_id !== null) {
        fetch("http://127.0.0.1:8000/usercomments/" + user_id + "/")
          .then((response) => response.json())
          .then((result) => {
            this.setState({
              comments: result,
              refreshing: false,
            });
            console.log(result);
          })
          .catch((error) => console.log("fetch error", error));
        this.setState({ refreshing: false });
      } else {
        console.log("user_id is null");
      }
    } catch (e) {
      console.log("error in value user_id ", e);
    }
  }
  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.fetchComments();
    }); // call fetchCats after setting the state
  };
  renderItemComponent = (data) => (
    <Comment
      comment_id={data.item.comment_id}
      date={data.item.date}
      nickname={data.item.nickname}
      product={data.item.product}
      rating={data.item.rating}
      text={data.item.text}
      validation={data.item.validation}
      navigation={this.props.navigation}
    />
  );
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <Button
            title="< Profile"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <FlatList
          data={this.state.comments}
          renderItem={(item) => this.renderItemComponent(item)}
          keyExtractor={(item) => item.comment_id.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        ></FlatList>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    //borderWidth: 0.2,
    //borderColor: "grey",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
    flexDirection: "row",
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 25,
    marginHorizontal: 3,
  },
  inputText: {
    flex: 1,
    fontWeight: "700",
    marginStart: 40, //marginLeft de aynı oldu
    alignSelf: "center",
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

  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#f2f2f2",
  },

  goBackButton: {
    marginTop: 15,
    height: 45,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  separator: {
    height: 0.2,
    backgroundColor: "grey",
    marginTop: 5,
    marginHorizontal: 20,
  },
  loginBtn: {
    width: "80%",
    //backgroundColor: `#9acd32`,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: colors.primary,
  },
  btnText: {
    color: "white",
  },
});
