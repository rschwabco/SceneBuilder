import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import { Entity, Scene } from "aframe-react";
import Camera from "../Camera"
import assets from "../../assets/registerAssets"
import { getAssetsQuery } from "../../GraphQL"

import gql from "graphql-tag";
import { Query } from "react-apollo";

import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native-web";


// Get array of positions and array of "Container" objects.
const ContainerQuery = getAssetsQuery("Container")


class ContainerScene extends Component {
    constructor(props) {
        super(props);
        this.state = {};


    }

    makeEntities = (data) => {

        const { obj, allPositions } = data
        const { name, scale } = obj[0]

        // Needs more work, but essentially;
        // Map over allPositions and return an entity with the corresponding position and element

        return allPositions.map((position, i) => {
            return (
                <a-entity click-drag key={i} position={`${position.x} ${position.y} ${position.z}`} scale={`${scale} ${scale} ${scale} `} obj-model={`obj: #${name}-obj; mtl: #${name}-mtl;`} >
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
            <Query query={ContainerQuery}>
                {({ loading, error, data }) => {

                    console.log("Data: ", data)

                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;

                    return (
                        <Scene vr-mode-ui keyboard-shortcuts leap="vr: false">

                            {/* Map over all (in this case just one) assets listed in GQL query and register said assets with a-frame */}
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

ContainerScene.propTypes = {};

export default ContainerScene;


