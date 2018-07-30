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
        this.state = {};


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

    render() {
        return (
            <Query query={getAssetsQuery(this.props.gqlQuery)}>
                {({ loading, error, data }) => {

                    console.log("Data from Scene: ", data)

                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;

                    return (
                        <Scene vr-mode-ui keyboard-shortcuts leap="vr: false">

                            {assets(data.obj, data.mtl)}

                            <Entity>
                                <Camera />
                                {this.props.children}
                                {this.makeEntities(data)}
                                <a-sky src="#sky" rotation="0 -270 0" />
                            </Entity>
                        </Scene>
                    )
                }}
            </Query>
        )
    }
}



export default SceneViewer;


