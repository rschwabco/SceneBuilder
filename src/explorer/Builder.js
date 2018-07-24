import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native-web";
import { colors, fontSize } from "./../styles";
import Environment from "../Environment";
import { Entity } from "aframe-react";
export default class SceneBuilder extends Component {
  state = {
    currency: "USD"
  };

  onCurrencyChange = currency => this.setState(() => ({ currency }));

  render() {
    return (
      <Environment>
        <Entity
          scale="1 1 1"
          geometry="primitive: sphere; radius: 0.2"
          position="0 0 -20"
          segments-height="128"
          segments-width="128"
        >
          <a-animation
            attribute="scale"
            direction="alternate-reverse"
            dur="5000"
            from="1 1 1"
            to="4 4 4"
            repeat="indefinite"
          />
        </Entity>
      </Environment>
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
