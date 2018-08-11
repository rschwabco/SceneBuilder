import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import "aframe-outline"
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import { Entity, Scene } from "aframe-react";
import Camera from "../Camera"
import assets from "../../assets/registerAssets"
import { HtmlShader } from "../../DataOverlay/HtmlShader"
import gql from "graphql-tag";
import { getAssetsQuery, getSceneQuery } from "../../GraphQL"
import { Query } from "react-apollo";
import { sample } from "underscore"
import { makeCargoShips, checkpoints } from "../Prefabs"
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native-web";



// Get array of positions and array of "Container" objects.
const query = getSceneQuery("CargoShip-Scene")


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
            assets: [],
            ships: [
                {
                    overlayText: [
                        "Propeller health: 75%",
                        "Fuel Levels: 95%"
                    ]
                }, {
                    overlayText: [
                        "Propeller health: 25% *",
                        "Engine health: 99%",
                        "Rudder health: 82%"
                    ]
                }
            ]
        };


    }


    _makeShips = (options, childData) => {
        const { showInfoModal, sceneId } = this.props
        return makeCargoShips({ options, showInfoModal, childData, sceneId })
    }


    render() {
        let { pitch, roll, yaw, x, y, z } = this.state;
        const { sceneId } = this.props


        return (
            <Query query={query}>
                {({ loading, error, data }) => {

                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;

                    const formattedData = data.scenes[0].assets.map(asset => {
                        const { scale, rotation, position } = asset
                        return {
                            name: asset.physicalModel.physicalAsset.name,
                            scale,
                            position,
                            rotation
                        }
                    })

                    return (
                        <a-entity>
                            {this._makeShips(this.state.ships, formattedData)}
                        </a-entity>
                    )
                }}
            </Query>
        )
    }
}

ContainerScene.propTypes = {};

export default ContainerScene;


