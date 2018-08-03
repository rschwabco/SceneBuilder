import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import { Entity, Scene } from "aframe-react";
import Camera from "../Camera"
import assets from "../../assets/registerAssets"
import { HtmlShader } from "../../DataOverlay/HtmlShader"
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

const dummyShipProp = [
    {
        overlayText: [
            "Propeller health: 95%",
            "Engine health: 56%",
            "Rudder health: 20% *"
        ]
    }, {
        overlayText: [
            "Propeller health: 25% *",
            "Engine health: 99%",
            "Rudder health: 82%"
        ]
    }
]
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
            assets: [],
            ships: [
                {
                    overlayText: [
                        "Propeller health: 95%",
                        "Rudder health: 20% *"
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

    _makeContainerRow = (options) => {

        const { rowNumber, color = "#FFF", wireframe = false } = options
        const containerWidth = 0.3
        const platformWidth = 2
        const rowZ = 0.75 * rowNumber
        let containers = []


        for (let i = -0.83; containers.length < 6; i += (containerWidth + 0.03)) {
            containers.push(
                <a-box
                    color={color}
                    width={containerWidth}
                    position={`${i} 1.155 ${-0.355 - rowZ}`}
                    height=".3"
                    depth=".7"
                    wireframe={wireframe}
                >
                </a-box>
            )
        }

        return containers
    }

    _makeShips = (options) => {

        return options.map((ship, i) => {
            // if (i === 0) { // Uncomment to test just 1 ship

            return (
                <a-entity
                    position={`${i * 3} 0 -6`}
                    log-info
                >
                    <a-sphere
                        // hover-info
                        id={`ship-${i}`}
                        color="#FFF"
                        theta-length="90"
                        phi-length="180"
                        rotation="180 180 0"
                        position="0 1 0"
                        wireframe={false}
                        side="double"
                    // wireframe="true"
                    ></a-sphere>
                    <a-ring
                        color="#FFF"
                        radius-inner=".001"
                        radius-outer="1"
                        position="0 .995 0"
                        rotation="270 0 0"
                    ></a-ring>
                    <a-cylinder
                        side="double"
                        color="#FFF"
                        theta-length="180"
                        theta-start="270"
                        height="3.5"
                        position="0 1 -1.75"
                        rotation="90 0 0"
                        wireframe={false}
                    ></a-cylinder>
                    <a-sphere
                        side="double"
                        color="#FFF"
                        theta-length="90"
                        phi-length="180"
                        rotation="90 180 0"
                        position="0 1 -3.5"
                        wireframe={false}
                    >
                    </a-sphere>
                    <a-ring
                        color="#FFF"
                        radius-inner=".001"
                        radius-outer="1"
                        position="0 .995 -3.5"
                        rotation="270 0 0"
                    ></a-ring>
                    <a-box
                        side="double"
                        color="#FFF"
                        position="0 0.975 -1.75"
                        depth="3.5"
                        width="2"
                        height="0.05"
                        wireframe={false}
                    >
                    </a-box>

                    {this._makeContainerRow({ rowNumber: 0 })}
                    {this._makeContainerRow({ rowNumber: 1, color: "#FFF", wireframe: false })}
                    {this._makeContainerRow({ rowNumber: 2, color: "#FFF", wireframe: true })}
                    {this._makeContainerRow({ rowNumber: 3, color: "#FFF", wireframe: false })}
                    <a-box
                        color="#FFF"
                        depth=".3"
                        height=".8"
                        width="1"
                        position="0 1.4 -3.258"
                    ></a-box>
                    <a-box
                        color="#FFF"
                        depth=".3"
                        height=".2"
                        width="0.2"
                        position="-.6 1.7 -3.258"
                    ></a-box>
                    <a-box
                        color="#FFF"
                        depth=".3"
                        height=".2"
                        width="0.2"
                        position=".6 1.7 -3.258"
                    ></a-box>
                    {this.props.showInfoModal &&
                        <HtmlShader id={i} overlayText={ship.overlayText} position={{ x: 2, y: 2, z: -2 }}
                        />
                    }
                </a-entity>
            )
            // }
        })

    }


    render() {
        let { pitch, roll, yaw, x, y, z } = this.state;


        return (
            <Query query={ContainerQuery}>
                {({ loading, error, data }) => {

                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;

                    return (
                        <a-entity>
                            {this._makeShips(this.state.ships)}
                        </a-entity>
                    )
                }}
            </Query>
        )
    }
}

ContainerScene.propTypes = {};

export default ContainerScene;


