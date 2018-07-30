import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native-web";
import { colors, fontSize } from "../styles/styles";
import { Entity } from "aframe-react";

export default class SceneBuilder extends Component {
    constructor() {
        super();

        this.state = {};
    }
    async getVessels() { }

    render() {
        return <View />;
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
