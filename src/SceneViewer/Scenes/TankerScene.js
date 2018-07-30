import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import { Entity, Scene } from "aframe-react";
import Camera from "../Camera"
import assets from "../../assets/registerAssets"

import gql from "graphql-tag";
import { getAssetsQuery } from "../../GraphQL"
import { Query } from "react-apollo";

import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native-web";


// Get array of positions and array of "Container" objects.
const ContainerQuery = getAssetsQuery("TankerShip")


class ContainerScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 1000,
            roll: 0,
            pitch: 0,
            yaw: 0,
            x: 0,
            y: 0,
            z: -10,
            pinch: false,
            assets: []
        };


    }

    makeEntities = (data) => {

        const { obj, allPositions } = data
        const { name, scale } = obj[0]

        // Needs more work, but essentially;
        // Map over allPositions and return an entity with the corresponding position and element
        // Figure out how to rotate on different axis

        return allPositions.map((position, i) => {
            if (i === 0) {

                return (
                    <a-entity click-drag key={i} position={`${0} ${0} ${0}`} scale={`${scale} ${scale} ${scale} `} rotation="0 225 0" obj-model={`obj: #${name}-obj; mtl: #${name}-mtl;`} >

                    </a-entity>
                )
            }
            return
        })
    }

    render() {
        let { pitch, roll, yaw, x, y, z } = this.state;
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


