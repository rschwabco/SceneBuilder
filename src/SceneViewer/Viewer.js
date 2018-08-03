
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
        // Here is where we are creating and registering our custom components
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

        aframe.registerComponent("hover-info", {
            init: function () {
                console.log("Hover info registered")
                this.el.addEventListener("mouseenter", (event) => {
                    console.log("Mouse entered: ", event.target);
                    // that.setState({ showInfoModal: true })
                })
                this.el.addEventListener("mouseleave", (event) => {
                    // that.setState({ showInfoModal: false })
                })
            }
        })

        aframe.registerComponent("log-info", {
            init: function () {
                this.el.addEventListener("click", (event) => {
                    console.log("Clicked Asset Postion: ", this.el.getAttribute('position'))
                })
            }
        })

        aframe.registerComponent('model-opacity', {
            schema: { default: 1.0 },
            init: function () {
                console.log("model-opacity registered")
                this.el.addEventListener('model-loaded', this.update.bind(this));
                this.el.addEventListener('mouseenter', this.update.bind(this))

                this.el.addEventListener('mouseleave', this.fadeIn.bind(this))
            },
            fadeOut: function (event) {
                console.log("Mouse entered")
                console.log('I was entered by: ', event.target); // Probably use something like this to do per-asset animation
                // that.setState({ assetOpacity: 0.5 }, () => console.log("New state: ", that.state))
            },
            fadeIn: function () {
                console.log("Mouse left")
                // that.setState({ assetOpacity: 1 }, () => console.log("New state: ", that.state))
            },
            update: function (event) {
                console.log("Model opacity model loaded: ", event)
                var mesh = this.el.getObject3D('mesh');
                var data = this.data;
                console.log("Model opacity mesh: ", mesh)
                if (!mesh) { return; }
                mesh.traverse(function (node) {
                    if (node.isMesh) {
                        node.material.opacity = data;
                        node.material.transparent = data < 1.0;
                        node.material.needsUpdate = true;
                    }
                });
            }
        });

        aframe.registerComponent("capture-tab", {
            init: function () {
                console.log("capture-tab registered")
                window.addEventListener("keydown", this.toggleOverlay.bind(this))
            },
            toggleOverlay: (event) => {
                if (event.code === "Space" || event.code === "Tab") {
                    that.setState({ showInfoModal: !that.state.showInfoModal })
                }
            }
        })

    }


    render() {
        const { currentScene } = this.state
        return (
            <Query query={getAllAssetsQuery()}>
                {({ loading, error, data }) => {


                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;


                    return (

                        <a-scene capture-tab cursor="rayOrigin:mouse" vr-mode-ui keyboard-shortcuts leap="vr: false">
                            {registerAllAssets(data.allPhysicalAssets)}
                            {/* <SceneViewer
                                rotateScene={this.state.rotateScene}
                                gqlQuery={currentScene}
                                onAssetClick={this._nextScene}
                                assetOpacity={this.state.assetOpacity}
                            >
                                {this.props.children}
                            </SceneViewer> */}
                            <TankerShipScene showInfoModal={this.state.showInfoModal} />
                            {/* <a-entity
                                outline="thickness: .005; color: #4CC3D9"
                                model-opacity="1"
                                click-drag
                                obj-model={`obj: #OilDrum-obj; mtl: #OilDrum-mtl`}
                            >
                                {this.state.assetOpacity === 0.5 && <a-animation
                                    attribute="model-opacity"
                                    dur="1000"
                                    from="1"
                                    to="0.5"
                                    repeat="0"></a-animation>}
                                {this.state.assetOpacity === 1 && <a-animation
                                    attribute="model-opacity"
                                    dur="1000"
                                    from="0.5"
                                    to="1"
                                    repeat="0"></a-animation>}
                            </a-entity> */}
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
