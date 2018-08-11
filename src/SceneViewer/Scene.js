import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as aframe from 'aframe'
import * as fff from 'aframe-text-geometry-component'
import * as kkk from 'aframe-event-set-component'
import { Entity, Scene } from 'aframe-react'
import Camera from './Camera'
import assets from '../assets/registerAssets'
import { getAssetsQuery, getSceneQuery } from '../GraphQL'
import registerClickDrag from 'aframe-click-drag-component'
import { TankerShipScene, GraphScene } from './Scenes'
import { checkpoints, makeCargoShips } from "./Prefabs"
import { Query } from 'react-apollo'
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native-web'
import { format } from 'url';

registerClickDrag(aframe)

class SceneViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pressedSky: false,
            updatedBy: '',
            rotateCamera: false,
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
            ],
            propeller: [
                {
                    overlayText: [
                        "Propeller Health: 1%"
                    ]
                }
            ],
            fuelTank: [
                {
                    overlayText: [
                        "Fuel Levels: 23%"
                    ]
                }
            ]
        }
        console.log("Scene state: ", this.state)
    }

    _makeShips = (options, data) => {
        const { showInfoModal } = this.props
        const { sceneId } = this.state

        const formattedData = data.scenes[0].assets.map(asset => {
            const { scale, rotation, position } = asset
            return {
                name: asset.physicalModel.physicalAsset.name,
                scale,
                position,
                rotation
            }
        })

        return makeCargoShips({ options, showInfoModal, formattedData })
    }

    _makePartScene = (options, data) => {

        const formattedData = data.scenes[0].assets.map(asset => {
            const { scale, rotation, position } = asset
            return {
                name: asset.physicalModel.physicalAsset.name,
                scale,
                position,
                rotation
            }
        })
        console.log("Formatted Propeller Data: ", formattedData)

        return formattedData.map((asset, i) => {
            const { name, position, rotation, scale } = asset
            if (i === 0) {
                return (
                    <a-entity
                        key={i}
                        position={`${position.x} ${position.y} ${-6}`}
                        scale={`${scale.x} ${scale.y} ${scale.z}`}
                        rotation={`${rotation.x} ${rotation.y} ${rotation.z}`}
                        obj-model={`obj: #${name}-obj; mtl: #${name}-mtl;`}
                    >
                        <a-animation attribute="rotation"
                            dur="30000"
                            fill="forwards"
                            to="0 360 0"
                            repeat="indefinite"></a-animation>
                    </a-entity>
                )
            }
        })
    }


    makeEntities = data => {
        const { obj, positions } = data
        const { name } = obj[0]

        // console.log("Data from scene.js: ", data)

        return positions.map((position, i) => {
            if (i === 0) {
                return (
                    <a-entity
                        model-opacity="1"
                        click-drag
                        // model-opacity
                        key={i}
                        // click-to-navigate
                        position={`${position.x} ${position.y} ${-6}`}
                        scale={`${1} ${1} ${1} `}
                        obj-model={`obj: #${name}-obj; mtl: #${name}-mtl;`}
                    >
                        {/* {this.props.assetOpacity === 0.5 && <a-animation
                            attribute="model-opacity"
                            dur="1000"
                            from="1"
                            to="0.5"
                            repeat="0"></a-animation>}
                        {this.props.assetOpacity === 1 && <a-animation
                            attribute="model-opacity"
                            dur="1000"
                            from="0.5"
                            to="1"
                            repeat="0"></a-animation>} */}
                    </a-entity>
                )
            }
        })
    }

    render() {
        const { gqlQuery } = this.props
        const { x, y, z } = this.props.scenePosition
        return (
            <Query query={getSceneQuery(gqlQuery)}>
                {({ loading, error, data }) => {

                    if (loading) return <ActivityIndicator color={'#fff'} />
                    if (error) return <Text>{`Error: ${error}`}</Text>

                    console.log("Scene data: ", data)
                    const sceneId = data.scenes[0].id

                    return (
                        <a-entity
                            rotation="0 0 0"
                            position={`${x} ${y} ${z}`}
                        >
                            {checkpoints({ lookAt: sceneId, offset: this.props.scenePosition })}
                            {this.props.gqlQuery === "CargoShip-Scene" && (
                                <a-entity
                                    id={sceneId}
                                >
                                    {this._makeShips(this.state.ships, data)}
                                </a-entity>
                            )}
                            {this.props.gqlQuery !== "CargoShip-Scene" && (
                                <a-entity
                                    id={sceneId}
                                >
                                    {this._makePartScene(this.state.propeller, data)}
                                </a-entity>
                            )}
                        </a-entity>
                    )
                }}
            </Query>
        )
    }
}

export default SceneViewer
