
import React, { Component } from "react";
// import 'aframe-physics-system'
// import "aframe-extras"
// import "aframe-outline"
import "aframe-look-at-component"
import "aframe-environment-component"
// import 'aframe-text-geometry-component'

import Scene from "./Scene"
import Camera from "./Camera"
import AmbientSceneLight from "./AmbientSceneLight"
import * as aframe from "aframe";
import { Query } from "react-apollo";
import registerAllAssets from "../assets/registerAllAssets"
import { getAllAssetsQuery, getRootSceneQuery } from "../GraphQL/index"
import {
    ActivityIndicator,
    Text,
} from "react-native-web";

import {
    clickToNavigate,
    cameraToHere,
    keypressNavigateBack,
    keypressShowInfo
} from "../AFrameFunctions"

import { NavBar } from "../Components"


const defaultXYZ = {
    x: 0,
    y: 0,
    z: 0
}

const prismaScenes = ["friday-demo-scene-container", "rebuilding-ship-scene", "tree-rings-container"]

export default class Viewer extends Component {
    constructor() {
        super();

        this.state = {
            showNeedsRepair: false,
            inputValue: "",
            animateSceneTransition: false,
            cameraAnimationDuration: 1500,
            currentAct: prismaScenes[2],
            currentScene: ["cjlh9wdeqamjp0b17ygkhc7ij"], // This needs to be updated on load
            scenePosition: { ...defaultXYZ, y: -1 },
            rotateCamera: false,
            rotationTo: "0 0 0",
            assetOpacity: 1,
            showInfoModal: false,
            cameraTo: "0 0 3.8",
            moveCamera: false,
        };
    }

    componentWillMount() {
        // * Register all requisite custom aframe functions, imported from src/AFrameFunctions

        clickToNavigate(this._clickToNavigate, this.state.cameraAnimationDuration) // rename

        // hoverInfo(info => console.log(info))

        // clickLogInfo(info => console.log("Info from viewer: ", info))

        // keypressShowInfo(["KeyR"], this._toggleShowNeedsRepair)

        // modelOpacity(this._updateObjectOpacity)

        cameraToHere(this._moveCamera, this.state.cameraAnimationDuration) // rename

        keypressNavigateBack(["Space"], this._navigateBack)


    }

    // TODO: Needs work
    _nextScene = (nextScene) => {
        // console.log("Next scene")
        this.setState({
            currentAct: this.state.currentAct === "OilDrum" ? "TankerShip" : "OilDrum",
            rotateCamera: !this.state.rotateCamera,
            scenePosition: this.state.scenePosition == defaultXYZ ? { ...defaultXYZ, z: 6 } : defaultXYZ
        })
    }

    // TODO: Needs work
    // _rotateCamera = (updatedBy) => {
    //     this.setState({ rotateCamera: !this.state.rotateCamera })
    //     setTimeout(() => this._nextScene(), 600)
    // }

    // _toggleInfoModal = () => {
    //     this.setState({ showInfoModal: !this.state.showInfoModal })
    // }

    _toggleShowNeedsRepair = () => {
        this.setState({ showNeedsRepair: !this.state.showNeedsRepair })
    }

    // _updateObjectOpacity = (assetOpacity) => {
    //     this.setState({ assetOpacity }, () => console.log("New state: ", this.state))
    // }

    _navigateBack = () => {
        const { currentScene } = this.state
        if (currentScene[currentScene.length - 1] === "cjlh9wdeqamjp0b17ygkhc7ij") {
            return
        }

        this.setState({ animateSceneTransition: true })
        console.log("state before nav back: ", this.state.currentScene)
        setTimeout(() => this.setState({ currentScene: currentScene.slice(0, currentScene.length - 1) }), 1000)
        setTimeout(() => this.setState({ animateSceneTransition: false }), 2000)
    }


    _clickToNavigate = (nextSceneId) => {
        console.log("Scene animating")
        this.setState({ animateSceneTransition: true })
        setTimeout(() => this.setState({ currentScene: [...this.state.currentScene, nextSceneId] }), 1000)
        setTimeout(() => this.setState({ animateSceneTransition: false }), 2000)
    }

    _moveCamera = (options) => {
        // console.log("Move camera options: ", options)
        // this.setState({ moveCamera: true, ...options })
        // setTimeout(() => this.setState({ moveCamera: false }), 0)

        this.setState({ animateSceneTransition: true })
        setTimeout(() => this.setState({ ...options }), 1000)
        setTimeout(() => this.setState({ animateSceneTransition: false }), 2000)
    }

    _selectNewScene = (newScene) => {
        this.setState({ inputValue: newScene, currentAct: newScene })
    }

    _flattenChildrenIds = (arr) => {
        let children = []
        const addIdToArray = (id, targetArray) => {
            targetArray.push(id)
        }

        const extractIds = (arr) => {
            let finding = true
            while (finding === true) {
                for (let val of arr) {
                    addIdToArray(val.id, children)
                    if (val.children) { extractIds(val.children) }
                }
                return finding = false
            }
        }

        extractIds(arr)
        // console.log("Children ids: ", children)

        // TODO: Do this better
        return children
        // return ["cjkn3ca5kgm8a0b77fr3a28q5", "cjkpj52yhnfx20b775yyoltxd", "cjkucjf0qak0f0b779utqrdeu"]
    }


    // TODO: REORG SCENES SO THAT TOP LEVEL SCENE HAS NO NODES, MOVE TOP LEVEL NODES TO A NEW FIRST CHILD
    render() {
        const { rotateCamera, moveCamera, cameraTo, rotationTo, cameraAnimationDuration, currentScene } = this.state
        // console.log("State: ", this.state)
        return (
            <Query query={getAllAssetsQuery()}>
                {({ loading, error, data }) => {


                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;

                    return (
                        <div id="sceneRoot" style={{ height: "100vh", width: "100%" }}>
                            {/* <NavBar
                                onSelect={this._selectNewScene}
                            /> */}
                            <a-scene

                                cursor="rayOrigin:mouse"
                                keypress-show-info
                                vr-mode-ui
                            // keyboard-shortcuts
                            // leap="vr: false"
                            >
                                <a-entity
                                    position="0 -5 0"
                                    environment="preset: default; seed: 3; dressingAmount: 4;">
                                </a-entity>

                                {registerAllAssets(data.physicalAssets)}

                                <Camera
                                    moveCamera={moveCamera}
                                    cameraTo={cameraTo}
                                    rotate={rotateCamera}
                                    rotationTo={rotationTo}
                                    cameraAnimationDuration={cameraAnimationDuration}
                                />

                                <Query query={getRootSceneQuery(this.state.currentAct)} >
                                    {({ loading, error, data }) => {

                                        if (loading) return <ActivityIndicator color={"#fff"} />;
                                        if (error) return <Text>{`Error: ${error}`}</Text>;

                                        const { containerNode, id, pq } = data.scenes[0]
                                        const { position } = containerNode

                                        return (
                                            <a-entity
                                                id={id}
                                                keypress-navigate-back
                                                position={`${position.x} ${position.y} ${position.z}`}
                                            >
                                                <AmbientSceneLight />

                                                <Scene
                                                    showNeedsRepair={this.state.showNeedsRepair}
                                                    animateSceneTransition={this.state.animateSceneTransition}
                                                    showInfoModal={this.state.showInfoModal}
                                                    queries={this._flattenChildrenIds(data.scenes[0].children)}
                                                    currentScene={`${currentScene[currentScene.length - 1]}`}
                                                // queries={data.scenes[0].children}
                                                />
                                            </a-entity>
                                        )
                                    }}
                                </Query>
                                {/* <a-sky src="#sky" /> */}
                            </a-scene>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

