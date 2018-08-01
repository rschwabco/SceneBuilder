import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import { Entity, Scene } from "aframe-react";
import Camera from "./Camera"
import assets from "../assets/registerAssets"
import { getAssetsQuery } from "../GraphQL/index"
import registerClickDrag from "aframe-click-drag-component";
import { Query } from "react-apollo";
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native-web";



registerClickDrag(aframe)


class SceneViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedSky: false,
            updatedBy: "",
            rotateCamera: false
        };


    }

    // TODO: This will need to be able to add different animations / behaviors.
    // TODO: This will need to also be able to take multiple different assets, or perhaps this should be called -PER- asset? That sounds better as I type it
    makeEntities = (data) => {

        const { obj, allPositions } = data
        const { name, scale } = obj[0]

        return allPositions.map((position, i) => {
            return (
                <a-entity
                    click-drag
                    key={i}
                    cursor-listener
                    position={`${position.x} ${position.y} ${position.z}`}
                    scale={`${scale} ${scale} ${scale} `}
                    obj-model={`obj: #${name}-obj; mtl: #${name}-mtl;`}
                >
                    {/* <a-animation
                                    begin="click"
                                    attribute="rotation"
                                    to="0 360 0"
                                    easing="linear"
                                    dur="2000"
                                    fill="backwards"
                                /> */}
                </a-entity>
            )
        })
    }

    updateState = (updatedBy) => {
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
                    // that.updateState()
                    // setTimeout(() => that.updateState(), 100)
                    that.props.onAssetClick("OilDrum")
                });
            }
        });

    }


    handleClick = () => {
        console.log('Clicked!');
    }

    render() {
        return (
            <Query query={getAssetsQuery(this.props.gqlQuery)}>
                {({ loading, error, data }) => {

                    console.log("Data from Scene: ", data)

                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;

                    return (
                        <a-entity>
                            {/* {assets(data.obj, data.mtl)} */}

                            <a-entity rotation="0 0 0" >
                                {this.makeEntities(data)}
                            </a-entity>
                            {/* <a-box
                                id="clicker"
                                classname="clickable"
                                cursor-listener
                                position="0 0 -3" rotation="0 45 0" color="#4CC3D9"
                            ></a-box>
                            <a-box
                                id="clicker"
                                classname="clickable"
                                cursor-listener
                                position="0 0 6" rotation="0 45 0" color="palevioletred"
                            ></a-box> */}
                            {/* <Camera rotate={this.state.rotateCamera} /> */}
                        </a-entity>
                    )
                }}
            </Query>
        )
    }
}



export default SceneViewer;


