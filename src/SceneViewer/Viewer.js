
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

import { HtmlShader } from "../DataOverlay/HtmlShader"

export default class Viewer extends Component {
    constructor() {
        super();

        this.state = {
            currentScene: "TankerShip",
            rotateScene: 0,
            rotateCamera: false
        };
    }

    _nextScene = (nextScene) => {

        this.setState({
            currentScene: this.state.currentScene === "OilDrum" ? "TankerShip" : "OilDrum",
            rotateCamera: !this.state.rotateCamera,
            rotateScene: this.state.rotateScene === 0 ? 6 : 0
        })
    }


    _updateState = (updatedBy) => {
        this.setState({ rotateCamera: !this.state.rotateCamera })
    }

    componentWillMount() {
        const state = this.state
        const that = this
        aframe.registerComponent('cursor-listener', {
            init: function () {
                console.log("Registered cursor-listener")
                this.el.addEventListener('click', (event) => {
                    console.log('I was clicked by: ', event.target);
                    that._updateState()
                    setTimeout(() => that._nextScene(), 600)
                    // that.setState({ currentScene: "OilDrum" })
                });
            }
        });

    }


    _handleClick = () => {
        console.log('Clicked!');
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
                            {/* <SceneViewer
                                rotateScene={this.state.rotateScene}
                                gqlQuery={currentScene}
                                onAssetClick={this._nextScene}
                            >
                                {this.props.children}
                            </SceneViewer> */}
                            <HtmlShader />
                            <Camera
                                rotate={this.state.rotateCamera}
                            />
                            <a-sky src="#sky" rotation="0 -270 0" />
                        </a-scene>

                    )
                }}
            </Query>
        )
    }
}
