
import React, { Component } from "react";
import "aframe"
import 'aframe-physics-system'
import "aframe-outline"
import "aframe-extras"
import "aframe-look-at-component"
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

import {
    clickLogInfo,
    clickToNavigate,
    hoverInfo,
    keypressShowInfo,
    modelOpacity,
    cameraToHere
} from "../AFrameFunctions"

import { HtmlShader } from "../DataOverlay/HtmlShader"

export default class Viewer extends Component {
    constructor() {
        super();

        this.state = {
            currentScene: "OilDrum",
            rotateScene: 0,
            rotateCamera: false,
            rotationTo: "0 0 0",
            assetOpacity: 1,
            showInfoModal: false,
            cameraTo: "0 0 3.8",
            updateCamera: false
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

    _moveCamera = (options) => {
        const { cameraTo, rotationTo } = options
        console.log("Move camera options: ", options)
        this.setState({ updateCamera: true, cameraTo, rotationTo })
        setTimeout(() => this.setState({ updateCamera: false }), 200)
    }

    componentWillMount() {
        // * Register all requisite custom aframe functions, imported from src/AFrameFunctions

        clickToNavigate(this._updateState)

        hoverInfo(info => console.log(info))

        clickLogInfo(info => console.log("Info from viewer: ", info))

        keypressShowInfo(["Space", "Tab"], this._toggleInfoModal)

        modelOpacity(this._updateObjectOpacity)

        cameraToHere(this._moveCamera)

    }


    render() {
        const { currentScene, rotateCamera, updateCamera, cameraTo, rotationTo } = this.state
        return (
            <Query query={getAllAssetsQuery()}>
                {({ loading, error, data }) => {


                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;


                    return (

                        <a-scene
                            // cursor="rayOrigin:mouse"
                            // keypress-show-info
                            vr-mode-ui
                            // keyboard-shortcuts
                            leap="vr: false"
                        >
                            {registerAllAssets(data.allPhysicalAssets)}
                            <Camera
                                updateCamera={updateCamera}
                                cameraTo={cameraTo}
                                rotate={rotateCamera}
                                rotationTo={rotationTo}
                            />
                            {/* <a-entity position="1 0 1">
                                <a-cylinder id="target" checkpoint radius="1" height="1" position="0 0 -5.2" color="#39BB82"></a-cylinder>
                                <a-cylinder checkpoint radius="1" height="1" position="3 0 0" color="#93648D"></a-cylinder>
                                <a-cylinder checkpoint radius="1" height="1" position="-3 0 0" color="#01A1F1"></a-cylinder>
                            </a-entity> */}
                            {/* <SceneViewer
                                rotateScene={this.state.rotateScene}
                                gqlQuery={currentScene}
                                onAssetClick={this._nextScene}
                                assetOpacity={this.state.assetOpacity}
                            >
                                {this.props.children}
                            </SceneViewer> */}
                            <TankerShipScene showInfoModal={this.state.showInfoModal} />


                            <a-sky src="#sky" rotation="0 -270 0" />
                        </a-scene>

                        // <a-scene>
                        //     <a-entity id="look-cam" camera="userHeight: 1.6" look-at="#target" look-controls wasd-controls></a-entity>
                        //     <a-entity id="container" position="0 0 -4">
                        //         <a-sphere id="target" color="#404040" radius="0.5">
                        //             <a-animation attribute="position" from="-8 6 -8" to="8 -3 -2" dur="1500"
                        //                 repeat="indefinite" fill="forwards" direction="alternate"></a-animation>
                        //         </a-sphere>

                        //         <a-entity position="5 3 0" rotation="0 70 0">
                        //             <a-box width="1" depth="1" height="1" color="#01A1F1" look-at="#target" position="-2 0 -4"></a-box>
                        //         </a-entity>
                        //         <a-box width="1" depth="1" height="1" color="#4CC3D9" look-at="#target"
                        //             position="-4 0 -2"></a-box>
                        //         <a-cylinder radius="0.6" height="2" color="#7BC8A4" look-at="#target"
                        //             position="0 0 -2"></a-cylinder>
                        //         <a-box width="0.5" depth="1" height="2" color="#F16745" look-at="#target"
                        //             position="4 0 -2"></a-box>
                        //         <a-cylinder radius="0.2" height="2" color="#7BC8A4" look-at="#target"
                        //             position="-4 0 1"></a-cylinder>
                        //         <a-box width="2" depth="1" height="0.25" color="#93648D" look-at="#target"
                        //             position="0 0 1"></a-box>
                        //         <a-box width="1" depth="2" height="0.5" color="#999" look-at="#target"
                        //             position="4 0 1"></a-box>

                        //         <a-box width="2" depth="2" height="2" color="#FFC65D" look-at="#look-cam"
                        //             position="-6 2.5 -2"></a-box>
                        //     </a-entity>

                        //     <a-sky color="#ECECEC"></a-sky>
                        // </a-scene>

                    )
                }}
            </Query>
        )
    }
}
