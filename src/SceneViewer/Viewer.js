
import React, { Component } from "react";
import "aframe"
import "aframe-outline"
import SceneViewer from "./Scene"
import { TankerShipScene } from "./Scenes"
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

import { clickLogInfo, clickToNavigate, hoverInfo, keypressShowInfo, modelOpacity } from "../AFrameFunctions"

import { HtmlShader } from "../DataOverlay/HtmlShader"

export default class Viewer extends Component {
    constructor() {
        super();

        this.state = {
            currentScene: "OilDrum",
            rotateScene: 0,
            rotateCamera: false,
            assetOpacity: 1,
            showInfoModal: false
        };
    }

    // TODO: Needs work
    _nextScene = (nextScene) => {
        console.log("Next scene")
        this.setState({
            currentScene: this.state.currentScene === "OilDrum" ? "TankerShip" : "OilDrum",
            rotateCamera: !this.state.rotateCamera,
            rotateScene: this.state.rotateScene === 0 ? 6 : 0
        })
    }

    // TODO: Needs work
    _updateState = (updatedBy) => {
        this.setState({ rotateCamera: !this.state.rotateCamera })
        setTimeout(() => this._nextScene(), 600)
    }

    _toggleInfoModal = () => {
        this.setState({ showInfoModal: !this.state.showInfoModal })
    }

    _updateObjectOpacity = (assetOpacity) => {
        this.setState({ assetOpacity }, () => console.log("New state: ", this.state))
    }

    componentWillMount() {
        // * Register all requisite custom aframe functions, imported from src/AFrameFunctions

        clickToNavigate(this._updateState)

        hoverInfo(info => console.log(info))

        clickLogInfo(info => console.log("Info from viewer: ", info))

        keypressShowInfo(["Space", "Tab"], this._toggleInfoModal)

        modelOpacity(this._updateObjectOpacity)



    }


    render() {
        const { currentScene } = this.state
        return (
            <Query query={getAllAssetsQuery()}>
                {({ loading, error, data }) => {


                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;


                    return (

                        <a-scene keypress-show-info cursor="rayOrigin:mouse" vr-mode-ui keyboard-shortcuts leap="vr: false">
                            {registerAllAssets(data.allPhysicalAssets)}
                            {/* <SceneViewer
                                rotateScene={this.state.rotateScene}
                                gqlQuery={currentScene}
                                onAssetClick={this._nextScene}
                                assetOpacity={this.state.assetOpacity}
                            >
                                {this.props.children}
                            </SceneViewer> */}
                            <TankerShipScene hover-info showInfoModal={this.state.showInfoModal} />
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
