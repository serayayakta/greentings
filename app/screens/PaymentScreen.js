import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CheckBox from "react-native-check-box";
import colors from "../config/colors";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-input-credit-card";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class PaymentScreen extends Component {
  _onChange(form) {
    console.log(form);
  }
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      address_id: 0,
      user_id: "1",
      isNewAddress: true,
      first_name: "",
      last_name: "",
      city: "",
      state: "",
      postal_code: 0,
      country: "",
      address_line: "",
      phone_number: 0,
    };
  }
  async getId() {
    const value = await AsyncStorage.getItem("@user_id");
    if (value !== null) {
      console.log("value of id in payment screen", value);
      this.setState({ user_id: value });
      // value previously stored
    } else {
      console.log("value of id is null");
    }
  }

  componentDidMount() {
    this.getId();
  }
  finishPayment = () => {
    try {
      const user_id = parseInt(this.state.user_id);
      console.log("user_id in (the last) finish and pay: ", user_id);
      if (user_id !== null && this.state.isChecked) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          user: user_id,
          address: this.state.address_id,
          total_price: this.props.navigation.getParam("total", 0),
        });
        console.log("raw ord body: ", raw);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch("http://127.0.0.1:8000/ord/", requestOptions)
          .then((response) => {
            if (response.status == 201) {
              //alert and navigate back

              console.log("başarılııı 201 :", response);
              this.props.navigation.goBack();
            }
          })
          .catch((error) => console.log("fetch error", error));
        this.setState({ refreshing: false });
      } else {
        console.log("user_id is null in finishPayment");
      }
    } catch (e) {
      console.log("error in finish and pay block", e);
      //is checked alerti ver
    }
  };

  async setAddressId(id) {
    try {
      await AsyncStorage.setItem("@address_id", id.toString());
    } catch (e) {
      console.log("error", e);
    }
    this.setState({ address_id: id }, this.finishPayment());
    console.log(
      "set state address id in async function is: ",
      this.state.address_id
    );
    const address = await AsyncStorage.getItem("@address_id");
    console.log("local storage address id in async function is: ", address);
  }

  addAddressAndFinish = () => {
    try {
      const user_id = parseInt(this.state.user_id);
      console.log("user_id after finish and pay with new address: ", user_id);
      if (user_id !== null && this.state.isChecked) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          user: user_id,
          address_id: 0,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          city: this.state.city,
          state: this.state.state,
          postal_code: this.state.postal_code,
          country: this.state.country,
          address_line: this.state.address_line,
          phone_number: this.state.phone_number,
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch("http://127.0.0.1:8000/address/", requestOptions)
          .then((response) => {
            console.log("response status", response.status);
            if (response.status == 201) {
              response.json().then((data) => {
                console.log("address_id console: ", data.address_id);
                this.setState({ address_id: data.address_id }, function () {
                  console.log("setState completed", this.state);
                });
                this.setAddressId(data.address_id);
              });
              // this.finishPayment();
            }
          })
          .catch((error) => console.log("fetch error", error));
        //console.log("set state address id is: ", this.state.address_id);
        this.setState({ refreshing: false });
      } else {
        console.log("user_id is null");
      }
    } catch (e) {
      console.log("error in add new address and finish block", e);
      //is checked alerti ver
    }
    console.log("out try set state address id is: ", this.state.address_id);
  };
  onFinishAndPay = () => {
    if (this.state.isNewAddress) {
      this.addAddressAndFinish();
    } else {
      this.finishPayment();
    }
  };

  render() {
    return (
      <View>
        <ScrollView style={styles.container}>
          <View style={styles.goBackButton}>
            <Button
              title="< Basket"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <Text style={styles.totalPriceText}>
            Total: ${" "}
            {JSON.stringify(
              this.props.navigation.getParam("total", "no total")
            )}
          </Text>
          <View style={styles.titles}>
            <Text style={styles.titlesText}> Shipping Address </Text>
          </View>
          <View>
            <CheckBox
              style={{ flex: 1, margin: 10 }}
              leftTextStyle={styles.checkBox}
              onClick={() => {
                this.setState({
                  isNewAddress: false,
                });
              }}
              isChecked={!this.state.isNewAddress}
              leftText={"Use my existing address"}
            />
            <CheckBox
              style={{ flex: 1, margin: 10 }}
              leftTextStyle={styles.checkBox}
              onClick={() => {
                this.setState({
                  isNewAddress: true,
                });
              }}
              isChecked={this.state.isNewAddress}
              leftText={"Enter a new address"}
            />
          </View>
          {this.state.isNewAddress && (
            <View style={styles.addressInfo}>
              <View style={styles.inputView}>
                <TextInput
                  autoCorrect={false}
                  multiline={true}
                  style={styles.inputText}
                  placeholder="First name..."
                  placeholderTextColor="#f2f2f2"
                  onChangeText={(text) => this.setState({ first_name: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  autoCorrect={false}
                  multiline={true}
                  style={styles.inputText}
                  placeholder="Last name..."
                  placeholderTextColor="#f2f2f2"
                  onChangeText={(text) => this.setState({ last_name: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  autoCorrect={false}
                  multiline={true}
                  style={styles.inputText}
                  placeholder="City..."
                  placeholderTextColor="#f2f2f2"
                  onChangeText={(text) => this.setState({ city: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  autoCorrect={false}
                  multiline={true}
                  style={styles.inputText}
                  placeholder="State..."
                  placeholderTextColor="#f2f2f2"
                  onChangeText={(text) => this.setState({ state: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  autoCorrect={false}
                  multiline={true}
                  style={styles.inputText}
                  placeholder="Postal code..."
                  placeholderTextColor="#f2f2f2"
                  onChangeText={(text) => this.setState({ postal_code: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  autoCorrect={false}
                  multiline={true}
                  style={styles.inputText}
                  placeholder="Country..."
                  placeholderTextColor="#f2f2f2"
                  onChangeText={(text) => this.setState({ country: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  autoCorrect={false}
                  multiline={true}
                  style={styles.inputText}
                  placeholder="Address line..."
                  placeholderTextColor="#f2f2f2"
                  onChangeText={(text) => this.setState({ address_line: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  autoCorrect={false}
                  multiline={true}
                  style={styles.inputText}
                  placeholder="Phone number..."
                  placeholderTextColor="#f2f2f2"
                  onChangeText={(text) => this.setState({ phone_number: text })}
                />
              </View>
            </View>
          )}

          <View style={styles.titles}>
            <Text style={styles.titlesText}>Credit Card Information</Text>
          </View>
          <View>
            <CreditCardInput onChange={this._onChange} />
          </View>

          <CheckBox
            style={{ flex: 1, margin: 10 }}
            leftTextStyle={styles.checkBox}
            onClick={() => {
              this.setState({
                isChecked: !this.state.isChecked,
              });
            }}
            isChecked={this.state.isChecked}
            leftText={"Terms & Conditions"}
          />
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => this.onFinishAndPay()}
          >
            <Text style={{ color: "white" }}>Finish and Pay</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  addressInfo: {},
  checkBox: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    marginHorizontal: 15,
  },
  goBackButton: {
    marginTop: 30,
    height: 45,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  inputText: {
    color: "black",
  },
  inputView: {
    backgroundColor: `#a9a9a9`,
    borderRadius: 5,
    height: 35,
    marginHorizontal: 45,
    marginVertical: 5,
    justifyContent: "center",
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 1,
  },
  payButton: {
    margin: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
  titles: {
    alignItems: "center",
    margin: 15,
  },
  titlesText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalPriceText: {
    margin: 10,
    fontSize: 20,
    fontFamily: "Helvetica Neue",
    textShadowColor: "black",
    textShadowOffset: { width: 0.2, height: 0.5 },
    textShadowRadius: 2,
    textAlign: "center",
  },
});
