
import React, { Component } from "react";
import SceneViewer from "./Scene"
import { CubeScene } from "./Scenes"
import Camera from "./Camera"
import * as aframe from "aframe";
import { Query } from "react-apollo";
import assets from "../assets/registerAssets"
import registerAllAssets from "../assets/registerAllAssets"
import { getAssetsQuery, getAllAssetsQuery } from "../GraphQL/index"
import registerClickDrag from "aframe-click-drag-component";
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native-web";

export default class Viewer extends Component {
    constructor() {
        super();

        this.state = {
            currentScene: "TankerShip",
        };
    }

    _nextScene = (nextScene) => {
        this.setState({ currentScene: nextScene })
    }

    // Sceneviewer gqlQuery prop changes scene contents
    render() {
        const { currentScene } = this.state
        return (
            <Query query={getAllAssetsQuery()}>
                {({ loading, error, data }) => {

                    console.log("Data from Scene: ", data)

                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;


                    return (

                        <a-scene vr-mode-ui keyboard-shortcuts leap="vr: false">
                            {registerAllAssets(data.allPhysicalAssets)}
                            <SceneViewer
                                gqlQuery={currentScene}
                                onAssetClick={this._nextScene}
                            >
                                {this.props.children}
                            </SceneViewer>
                            <Camera
                            // rotate={this.state.rotateCamera}
                            />
                            <a-sky src="#sky" rotation="0 -270 0" />
                        </a-scene>

                    )
                }}
            </Query>
        )
    }
}
