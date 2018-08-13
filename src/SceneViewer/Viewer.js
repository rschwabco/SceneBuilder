
import React, { Component } from "react";
import "aframe"
// import 'aframe-physics-system'
// import "aframe-extras"
import "aframe-outline"
import "aframe-look-at-component"
import "aframe-environment-component"
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

import { NavBar } from "../Components"

import { HtmlShader } from "../DataOverlay/HtmlShader"

const defaultXYZ = {
    x: 0,
    y: 0,
    z: 0
}

export default class Viewer extends Component {
    constructor() {
        super();

        this.state = {
            inputValue: "",
            cameraAnimationDuration: 1500,
            currentScene: "TankerShip",
            scenePosition: { ...defaultXYZ, y: -1 },
            rotateCamera: false,
            rotationTo: "0 0 0",
            assetOpacity: 1,
            showInfoModal: false,
            cameraTo: "0 0 3.8",
            moveCamera: false
        };
    }

    componentWillMount() {
        // * Register all requisite custom aframe functions, imported from src/AFrameFunctions

        clickToNavigate(this._rotateCamera)

        hoverInfo(info => console.log(info))

        clickLogInfo(info => console.log("Info from viewer: ", info))

        keypressShowInfo(["Space", "Tab"], this._toggleInfoModal)

        modelOpacity(this._updateObjectOpacity)

        cameraToHere(this._moveCamera, this.state.cameraAnimationDuration)

    }

    // TODO: Needs work
    _nextScene = (nextScene) => {
        console.log("Next scene")
        this.setState({
            currentScene: this.state.currentScene === "OilDrum" ? "TankerShip" : "OilDrum",
            rotateCamera: !this.state.rotateCamera,
            scenePosition: this.state.scenePosition == defaultXYZ ? { ...defaultXYZ, z: 6 } : defaultXYZ
        })
    }

    // TODO: Needs work
    _rotateCamera = (updatedBy) => {
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
        // console.log("Move camera options: ", options)
        this.setState({ moveCamera: true, cameraTo, rotationTo })
        setTimeout(() => this.setState({ moveCamera: false }), 20)
    }



    _selectNewScene = (newScene) => {
        this.setState({ inputValue: newScene, currentScene: newScene })
    }

    _makeScenes = (scenes) => {
        const initPosition = { x: 0, y: -1, z: 0 }
        const isOdd = (num) => num % 2 === 1
        const isThreeOrFour = num => num % 3 === 0 || num % 4 === 0
        const offset = 45
        return scenes.map((scene, i) => {
            const position = { x: isOdd(i) ? offset : -offset, y: i * offset, z: isThreeOrFour(i) ? offset : -offset }
            return (
                <SceneViewer
                    scenePosition={i === 0 ? initPosition : position}
                    gqlQuery={scene}
                    onAssetClick={this._nextScene}
                    assetOpacity={this.state.assetOpacity}
                    showInfoModal={this.state.showInfoModal}
                >
                    {this.props.children}
                </SceneViewer>
            )
        })
    }

    render() {
        const { currentScene, rotateCamera, moveCamera, cameraTo, rotationTo, cameraAnimationDuration } = this.state
        // console.log("State: ", this.state)
        return (
            <Query query={getAllAssetsQuery()}>
                {({ loading, error, data }) => {


                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;
                    ["CargoShip-Scene", "CargoShip-Part_Propeller", "CargoShip-Part_FuelTank"]

                    return (
                        <div id="sceneRoot" style={{ height: "100vh", width: "100%" }}>
                            <NavBar
                                onSelect={this._selectNewScene}
                            />
                            <a-scene

                                cursor="rayOrigin:mouse"
                                keypress-show-info
                                vr-mode-ui
                            // keyboard-shortcuts
                            // leap="vr: false"
                            >
                                <a-entity position="0 -5 0" environment="preset: checkerboard; skyType: atmosphere; ground: hills; dressingScale: .1;dressingAmount: 2; dressingColor: #7C4DFF; lightPosition: 1 2 2;"></a-entity>
                                {registerAllAssets(data.physicalAssets)}
                                <Camera
                                    moveCamera={moveCamera}
                                    cameraTo={cameraTo}
                                    rotate={rotateCamera}
                                    rotationTo={rotationTo}
                                    cameraAnimationDuration={cameraAnimationDuration}
                                />
                                {this._makeScenes(["CargoShip-Scene", "CargoShip-Part_Propeller", "CargoShip-Part_FuelTank", "CargoShip-Part_Propeller", "CargoShip-Part_FuelTank", "CargoShip-Part_Propeller", "CargoShip-Part_FuelTank", "CargoShip-Part_Propeller", "CargoShip-Part_FuelTank"])}
                                {/* <SceneViewer
                                    scenePosition={{ x: 0, y: -1, z: 0 }}
                                    gqlQuery={"CargoShip-Scene"}
                                    onAssetClick={this._nextScene}
                                    assetOpacity={this.state.assetOpacity}
                                    showInfoModal={this.state.showInfoModal}
                                >
                                    {this.props.children}
                                </SceneViewer>
                                <SceneViewer
                                    scenePosition={{ x: 25, y: 25, z: 25 }}
                                    gqlQuery={"CargoShip-Part_Propeller"}
                                    onAssetClick={this._nextScene}
                                    assetOpacity={this.state.assetOpacity}
                                    showInfoModal={this.state.showInfoModal}
                                >
                                    {this.props.children}
                                </SceneViewer>
                                <SceneViewer
                                    scenePosition={{ x: -35, y: 45, z: 25 }}
                                    gqlQuery={"CargoShip-Part_FuelTank"}
                                    onAssetClick={this._nextScene}
                                    assetOpacity={this.state.assetOpacity}
                                    showInfoModal={this.state.showInfoModal}
                                >
                                    {this.props.children}
                                </SceneViewer> */}

                                {/* <a-sky src="#sky" rotation="0 -270 0" /> */}
                            </a-scene>
                        </div>
                    )
                }}
            </Query>
        )
    }
}
