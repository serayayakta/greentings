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

export default class PasswordDetailScreen extends Component {
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
        <View style={styles.menuWrapper}>
          <View style={styles.menuItem}>
            <Text style={{ marginLeft: 10 }}>Favorites</Text>
            <TextInput
              placeholder="Search here"
              placeholderTextColor="grey"
              style={styles.inputText}
              //onChangeText={() => {
              //this.setState({ searchKey: text });
              //}}
            />
          </View>
          <View style={styles.separator}></View>
          <View style={styles.menuItem}>
            <Text style={{ marginLeft: 10 }}>yes</Text>
          </View>
        </View>
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
    marginLeft: 70,
    flex: 1,
    fontWeight: "700",
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
});
