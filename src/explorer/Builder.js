import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native-web";
import { colors, fontSize } from "./../styles";
import Environment from "../Environment";
import { Entity } from "aframe-react";
export default class SceneBuilder extends Component {
  render() {
    return (
      <Environment>
        <Entity
          events={{
            click: () => {
              console.log("click");
            }
          }}
          obj-model="obj: #vessel-obj; mtl: #vessel-mtl"
          mtl="#vessel-mtl"
          rotation="0 0 0"
          scale="3 3 3"
          position="120 20 -130"
        >
          <a-animation
            attribute="rotation"
            dur="20000"
            to={`360 0 360`}
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
