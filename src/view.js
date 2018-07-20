import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native-web";
import ExchangeRateList from "./list";
import { colors, fontSize } from "./styles";

export default class SceneBuilder extends Component {
  state = {
    currency: "USD"
  };

  onCurrencyChange = currency => this.setState(() => ({ currency }));

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Scenes</Text>
        <Text style={styles.body}>Yay</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  heading: {
    fontSize: fontSize.large,
    fontWeight: "200",
    color: colors.white,
    letterSpacing: 6
  },
  body: {
    fontSize: fontSize.medium,
    fontWeight: "200",
    color: colors.white,
    letterSpacing: 6
  }
});
