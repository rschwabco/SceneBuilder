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

// const props = {
//     showInfoModal,
//     containerNode: {
//         id: "", // ID of top level a-entity
//         name: "", // Use to determine container component. Needs more thoughts
//         position: { // Position of top level a-entity
//             x: 0,
//             y: 0,
//             z: 0
//         } //ContainerNode is NOT a 3d model
//     },
//     semanticLayoutNodes: [ // Use this to 3d models
//         {
//             physicalModel: {
//                 physicalAsset: { name: "AssetName" } // Used to refer to assets registered on app load
//             },
//             position: {
//                 x: 0,
//                 y: 0,
//                 z: 0
//             },
//             rotation: {
//                 x: 0,
//                 y: 0,
//                 z: 0
//             },
//             scale: {
//                 x: 0,
//                 y: 0,
//                 z: 0
//             }
//         }
//     ],
//     connectedTo: [ // Use this to make checkpoints
//         {
//             id: "",
//             position: {
//                 x: 0,
//                 y: 0,
//                 z: 0
//             }
//         }
//     ]
// }


class SceneViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ships: [ //REMOVE ASAP
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

        return makeCargoShips({ options, showInfoModal, childData: formattedData })
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


    _renderContainer = () => {

    }

    _renderCheckpoints = () => {

    }

    _renderSemanticLayoutNodes = () => {
        const { semanticLayoutNodes } = this.props

        return semanticLayoutNodes.map((semanticLayoutNode, i) => {
            const { physicalModel, position, rotation, scale } = semanticLayoutNode
            const { physicalAsset } = physicalModel
            const { name } = physicalAsset
            return (
                <a-entity // CONTAINER NODE, CURRENTLY BLANK IF NOT CONTAINER SHIP
                >
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
                </a-entity>
            )
        })
    }
    _renderShipContainer = () => { // Need to abstract this out asap
        const { containerNode, semanticLayoutNodes, showInfoModal } = this.props
        const { id } = containerNode

        const formattedData = semanticLayoutNodes.map((semanticLayoutNode, i) => {
            const { physicalModel, position, rotation, scale } = semanticLayoutNode
            const { physicalAsset } = physicalModel
            const { name } = physicalAsset

            return {
                name,
                scale,
                position,
                rotation
            }
        })

        return makeCargoShips({ options: this.state.ships, showInfoModal, childData: formattedData })
    }

    render() {

        // Container node references
        const { containerNode } = this.props
        const { id, position, name } = containerNode
        const { x, y, z } = position

        return (
            <Query query={getSceneQuery("")}>
                {({ loading, error, data }) => {

                    if (loading) return <ActivityIndicator color={'#fff'} />
                    if (error) return <Text>{`Error: ${error}`}</Text>

                    return (
                        <a-entity // TOP LEVEL SCENE NODE
                            id={id}
                            rotation="0 0 0"
                            position={`${x} ${y} ${z}`}
                        >
                            {checkpoints(this._tempGetCheckpints())}
                            {name === "CargoShip-Scene" ?
                                this._makeShips(this.state.ships, data) :
                                this._renderSemanticLayoutNodes()
                            }
                        </a-entity>
                    )
                }}
            </Query>
        )
    }
}

export default SceneViewer
