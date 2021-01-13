import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class VerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      user_id: "",
      code: "",
    };
  }
  async getId() {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        console.log("value of id in profile", value);
        this.setState({ user_id: value });
      } else {
        console.log("value of id is null");
      }
    } catch (e) {
      console.log("error in value id ", e);
    }
  }
  componentDidMount() {
    this.getId();
  }

  onVerify = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: this.state.user_id,
      verification_code: this.state.code,
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/emailconfirm/", requestOptions)
      .then((response) => {
        console.log("response statusssss ", response.status);

        if (response.status == 400) {
          alert("Verification code does not match.");
        }
        if (response.status == 200) {
          alert("Account is verified.");

          this.props.navigation.goBack();
        }
      })
      .catch((error) => console.log("error?", error));
  };

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
            <Text style={{ marginLeft: 10 }}>
              The verification code is sent when you registered to Greentings.
              Please check your email, it is possibly in the spam box...
            </Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.menuItem}>
            <Text style={{ marginLeft: 10 }}>Verification Code:</Text>
            <TextInput
              placeholder="..."
              placeholderTextColor="grey"
              style={styles.inputText}
              secureTextEntry
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({ code: text }),
                  console.log("verif code: ", this.state.code);
              }}
            />
          </View>
          <View style={styles.separator}></View>

          <View style={styles.separator}></View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.loginBtn} onPress={this.onVerify}>
              <Text style={styles.btnText}>Verify</Text>
            </TouchableOpacity>
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
