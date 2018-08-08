
import React, { Component } from "react";
import "aframe"
// import 'aframe-physics-system'
// import "aframe-extras"
import "aframe-outline"
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

import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
} from "@blueprintjs/core";

import AutoComplete from "react-autocomplete"

import { HtmlShader } from "../DataOverlay/HtmlShader"

const scenes = [
    {
        sceneName: "FuelTankCaged"
    },
    {
        sceneName: "OilDrum"
    },
    {
        sceneName: "Pallet"
    },
    {
        sceneName: "Container"
    },
    {
        sceneName: "Enterprise"
    },
    {
        sceneName: "TankerShip"
    },
    {
        sceneName: "Propeller"
    }
]

export default class Viewer extends Component {
    constructor() {
        super();

        this.state = {
            inputValue: "",
            currentScene: "TankerShip",
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
        setTimeout(() => this.setState({ updateCamera: false }), 20)
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

    _matchSceneName = (scene, value) => {
        console.log("Scene: ", scene)
        console.log("Value: ", value)
        return (
            scene.sceneName.toLowerCase().indexOf(value.toLowerCase()) !== -1
        )
    }

    _selectNewScene = (newScene) => {
        this.setState({ inputValue: newScene, currentScene: newScene })
    }


    render() {
        const { currentScene, rotateCamera, updateCamera, cameraTo, rotationTo } = this.state
        console.log("State: ", this.state)
        return (
            <Query query={getAllAssetsQuery()}>
                {({ loading, error, data }) => {


                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;


                    return (
                        <div style={{ height: "100vh", width: "100%" }}>
                            <Navbar className="bp3-dark">
                                <NavbarGroup align={Alignment.LEFT}>
                                    <NavbarHeading>Scenes</NavbarHeading>
                                    <NavbarDivider />
                                    <AutoComplete
                                        value={this.state.inputValue}
                                        getItemValue={item => item.sceneName}
                                        items={scenes}
                                        onChange={(event, inputValue) => this.setState({ inputValue })}
                                        onSelect={inputValue => this._selectNewScene(inputValue)}
                                        // shouldItemRender={this._matchSceneName}
                                        renderItem={(item, isHighlighted) =>
                                            <div style={{ background: isHighlighted ? 'lightgray' : 'white', color: "black" }}>
                                                {item.sceneName}
                                            </div>
                                        }
                                    />
                                </NavbarGroup>
                            </Navbar>
                            <a-scene
                                cursor="rayOrigin:mouse"
                                keypress-show-info
                                vr-mode-ui
                            // keyboard-shortcuts
                            // leap="vr: false"
                            >
                                {registerAllAssets(data.physicalAssets)}
                                <Camera
                                    updateCamera={updateCamera}
                                    cameraTo={cameraTo}
                                    rotate={rotateCamera}
                                    rotationTo={rotationTo}
                                />
                                <SceneViewer
                                    rotateScene={this.state.rotateScene}
                                    gqlQuery={currentScene}
                                    onAssetClick={this._nextScene}
                                    assetOpacity={this.state.assetOpacity}
                                    showInfoModal={this.state.showInfoModal}
                                >
                                    {this.props.children}
                                </SceneViewer>


                                <a-sky src="#sky" rotation="0 -270 0" />
                            </a-scene>
                        </div>
                    )
                }}
            </Query>
        )
    }
}
