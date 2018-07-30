// Copied from Viewer. Probably unnecessary

import React, { Component } from "react";
import { colors, fontSize } from "../styles/styles";
import { ContainerScene, PropellerScene, PalletScene, OilDrumScene, TankerShipScene, SmallShipsScene, MaerskContainerScene } from "./Scenes"
import { Entity } from "aframe-react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native-web";


export default class SceneViewer extends Component {
    constructor() {
        super();

        this.state = {
            selectedScene: false
        };
    }


    render() {
        return (
            <Query query={ScenesQuery}>
                {({ loading, error, data }) => {
                    console.log("Query data: ", data)
                    if (loading) return <ActivityIndicator color={colors.teal} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;

                    let scenes = data.allScenes.map((scene, key) => {
                        return (
                            <a-plane
                                position={`-0.9 ${0.2 + key} -3`}
                                events={{
                                    click: () => {
                                        console.log("heyllo");
                                    }
                                }}
                            >
                                <a-entity
                                    mixin="boldFont"
                                    text-geometry={`value: ${scene.name}`}
                                    bevelSize="11"
                                    bevelThickness="130"
                                />
                            </a-plane>
                        );
                    });

                    let selectedScene = !this.state.selectedScene ? (
                        <div />
                    ) : (
                            <a-entity
                                mixin="boldFont"
                                text-geometry={`value: ${this.state.selectedScene.name}`}
                            />
                        );

                    return (
                        <Entity>
                            <Entity position={`-0.9 0.2 -5`} />
                            <a-entity text="text: Dog?" />
                            {scenes}
                        </Entity>
                    );
                }}
            </Query>
        )
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
