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
import { makeCargoShips } from "../Prefabs"
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
        const { showInfoModal } = this.props
        return makeCargoShips(options, showInfoModal, childData)
    }

    _renderAccessories = () => {
        return (
            <a-entity>
                <a-box
                    id="youCouldLookAtMe"
                    camera-to-here="cameraTo: 0 3.5 -20; lookAt: #lookAtMyPropeller"
                    color="yellow"
                    position="2 0 -15"
                >
                </a-box>
                <a-box
                    id="checkIt"
                    camera-to-here="cameraTo: 0 -9.5 -20; lookAt: #lookAtMyFuelTank"
                    color="teal"
                    position="-2 0 -15"
                >
                </a-box>
                <a-entity
                    id="lookAtMyPropeller"
                    camera-to-here="cameraTo: 0 0 0; lookAt: #lookAtMyPropeller"
                    scale={`${.001} ${.001} ${.001} `}
                    rotation={`${0} ${270} ${0}`}
                    obj-model={`obj: #Propeller-obj;`}
                    material="color: orangered"
                    position="0 3 -22"
                >
                </a-entity>
                <a-entity
                    id="lookAtMyFuelTank"
                    camera-to-here="cameraTo: 0 0 0; lookAt: #lookAtMyFuelTank"
                    scale={`${.1} ${.1} ${.1} `}
                    rotation={`${0} ${45} ${0}`}
                    material="color: #4CAF50"
                    obj-model={`obj: #FuelTankCaged-obj;`}
                    position="0 -10 -22"
                >
                </a-entity>

                <a-box
                    id="lookAtMe"
                    color="palevioletred"
                    position="-2 0 1"
                    camera-to-here="cameraTo: 0 -3 10; lookAt: #youCouldLookAtMe"
                >
                </a-box>
                <a-box
                    camera-to-here="cameraTo: 0 3 20; lookAt: #lookAtMe"
                    id="orLookAtMe"
                    color="orangered"
                    position="6 2 1"
                >
                </a-box>
            </a-entity>
        )
    }


    render() {
        let { pitch, roll, yaw, x, y, z } = this.state;


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
                    console.log("TankerScene data: ", formattedData)

                    return (
                        <a-entity>
                            {/* {this._renderAccessories()} */}
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


