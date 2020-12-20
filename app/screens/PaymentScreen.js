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

export default class PaymentScreen extends Component {
  _onChange(form) {
    console.log(form);
  }
  constructor(props) {
    super(props);
    this.state = {
      user_id: "1",
      isChecked: false,
    };
  }
  render() {
    return (
      <View>
        <View style={styles.goBackButton}>
          <Button
            title="< Basket"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.titles}>
            <Text style={styles.titlesText}>Shipping Address</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              autoCorrect={false}
              multiline={true}
              style={styles.inputText}
              placeholder="Shipping address..."
              placeholderTextColor="#f2f2f2"
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
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
          <TouchableOpacity style={styles.payButton} onPress={() => {}}>
            <Text style={{ color: "white" }}>Finish and Pay</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    height: 100,
    color: "white",
  },
  inputView: {
    backgroundColor: `#a9a9a9`,
    borderRadius: 5,
    height: 120,
    marginHorizontal: 45,
    justifyContent: "center",
    padding: 20,
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
    margin: 10,
  },
  titlesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
