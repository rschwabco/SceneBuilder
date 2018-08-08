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
import { getAssetsQuery } from "../../GraphQL"
import { Query } from "react-apollo";
import { sample } from "underscore"

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

const containerColors = () => sample([
    "#03A9F4",
    "#FFEB3B",
    "#757575",
    "#FF4081",
    "#7B1FA2"
])

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

    _makeContainerRow = (options) => {

        const { rowNumber, showInfoModal, wireframe = false } = options
        const containerWidth = 0.3
        const platformWidth = 2
        const rowZ = 0.75 * rowNumber
        let containers = []


        for (let i = -0.83; containers.length < 6; i += (containerWidth + 0.03)) {
            containers.push(
                <a-box
                    key={i}
                    color={showInfoModal ? "#FFF" : containerColors()}
                    width={containerWidth}
                    outline="thickness: 0; color: red"
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
        const { showInfoModal } = this.props
        const wireframe = showInfoModal // Play with these!
        const containerWireframe = false  // Play with these!

        return options.map((ship, i) => {
            if (i === 0) { // Uncomment to test just 1 ship

                return (
                    <a-entity
                        position={`${i * 3} 0 -6`}
                        click-log-info
                    >
                        <a-sphere
                            wireframe={wireframe}
                            // hover-info
                            id={`ship-${i}`}
                            color="#FFF"
                            theta-length="90"
                            phi-length="180"
                            rotation="180 180 0"
                            position="0 1 0"
                            side="double"
                        // wireframe="true"
                        ></a-sphere>
                        <a-ring
                            wireframe={wireframe}
                            color="#FFF"
                            radius-inner=".001"
                            radius-outer="1"
                            position="0 .995 0"
                            rotation="270 0 0"
                        ></a-ring>
                        <a-cylinder
                            wireframe={wireframe}
                            side="double"
                            color="#FFF"
                            theta-length="180"
                            theta-start="270"
                            height="3.5"
                            position="0 1 -1.75"
                            rotation="90 0 0"
                        ></a-cylinder>
                        <a-sphere
                            wireframe={wireframe}
                            side="double"
                            color="#FFF"
                            theta-length="90"
                            phi-length="180"
                            rotation="90 180 0"
                            position="0 1 -3.5"
                        >
                        </a-sphere>
                        <a-ring
                            wireframe={wireframe}
                            color="#FFF"
                            radius-inner=".001"
                            radius-outer="1"
                            position="0 .995 -3.5"
                            rotation="270 0 0"
                        ></a-ring>
                        <a-box
                            wireframe={wireframe}
                            side="double"
                            color="#FFF"
                            position="0 0.975 -1.75"
                            depth="3.5"
                            width="2"
                            height="0.05"
                        >
                        </a-box>

                        {this._makeContainerRow({ rowNumber: 0, wireframe: containerWireframe, showInfoModal })}
                        {this._makeContainerRow({ rowNumber: 1, wireframe: containerWireframe, showInfoModal })}
                        {this._makeContainerRow({ rowNumber: 2, wireframe: containerWireframe, showInfoModal })}
                        {this._makeContainerRow({ rowNumber: 3, wireframe: containerWireframe, showInfoModal })}
                        <a-box
                            wireframe={wireframe}
                            color="#FFF"
                            depth=".3"
                            height=".8"
                            width="1"
                            position="0 1.4 -3.258"
                        ></a-box>
                        <a-box
                            wireframe={wireframe}
                            color="#FFF"
                            depth=".3"
                            height=".2"
                            width="0.2"
                            position="-.6 1.7 -3.258"
                        ></a-box>
                        <a-box
                            wireframe={wireframe}
                            color="#FFF"
                            depth=".3"
                            height=".2"
                            width="0.2"
                            position=".6 1.7 -3.258"
                        ></a-box>
                        {this.props.showInfoModal && // Add dynamic assets here
                            <a-entity>
                                <a-entity
                                    // Fuel Tank
                                    // click-to-navigate
                                    position={`${-.4} ${.4} ${-2.44}`}
                                    rotation={`${0} ${0} ${0}`}
                                    scale={`${.1} ${.1} ${.1} `}
                                    material="color: #4CAF50"
                                    outline="thickness: .0005; color: #FFF"
                                    obj-model={`obj: #FuelTankCaged-obj;`}
                                >
                                </a-entity>
                                <a-entity
                                    // Fuel Tank
                                    // click-to-navigate
                                    position={`${-.4} ${.4} ${-3.09}`}
                                    rotation={`${0} ${0} ${0}`}
                                    scale={`${.1} ${.1} ${.1} `}
                                    material="color: #4CAF50"
                                    outline="thickness: .0005; color: #FFF"
                                    obj-model={`obj: #FuelTankCaged-obj;`}
                                >
                                </a-entity>
                                <a-entity
                                    // Fuel Tank
                                    // click-to-navigate
                                    position={`${.4} ${.4} ${-2.44}`}
                                    rotation={`${0} ${0} ${0}`}
                                    scale={`${.1} ${.1} ${.1} `}
                                    material="color: #4CAF50"
                                    outline="thickness: .0005; color: #FFF"
                                    obj-model={`obj: #FuelTankCaged-obj;`}
                                >
                                </a-entity>
                                <a-entity
                                    // Fuel Tank
                                    // click-to-navigate
                                    position={`${.4} ${.4} ${-3.09}`}
                                    rotation={`${0} ${0} ${0}`}
                                    scale={`${.1} ${.1} ${.1} `}
                                    material="color: #4CAF50"
                                    outline="thickness: .0005; color: #FFF"
                                    obj-model={`obj: #FuelTankCaged-obj;`}
                                >
                                </a-entity>
                                <a-entity
                                    // Propeller
                                    // click-to-navigate
                                    material="color: #FFEB3B"
                                    position={`${.42} ${.06} ${-4.105}`}
                                    rotation={`${0} ${90} ${0}`}
                                    scale={`${.0002} ${.0002} ${.0002} `}
                                    color="white"
                                    obj-model={`obj: #Propeller-obj;`}
                                >
                                </a-entity>
                                <a-entity
                                    // Propeller
                                    // click-to-navigate
                                    material="color: #FFEB3B"
                                    position={`${-.42} ${.06} ${-4.105}`}
                                    rotation={`${0} ${90} ${0}`}
                                    scale={`${.0002} ${.0002} ${.0002} `}
                                    color="white"
                                    obj-model={`obj: #Propeller-obj;`}
                                >
                                </a-entity>
                                <HtmlShader id={i} overlayText={ship.overlayText} position={{ x: 2, y: 2, z: -2 }}
                                />
                            </a-entity>
                        }
                    </a-entity>
                )
            }
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
                            {this._makeShips(this.state.ships)}
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
                }}
            </Query>
        )
    }
}

ContainerScene.propTypes = {};

export default ContainerScene;


