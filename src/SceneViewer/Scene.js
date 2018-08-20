import React, { Component } from 'react'
import * as aframe from 'aframe'
import { getSceneQuery } from '../GraphQL'
import { makeCheckpoints, makeCargoShips } from "./Prefabs"
import { Query } from 'react-apollo'
import {
    ActivityIndicator,
    Text,
} from 'react-native-web'
import { check } from 'graphql-anywhere';

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


class Scene extends Component {
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



    _renderContainer = () => {

    }

    _renderCheckpoints = () => {

    }

    _getQueryData = (queries) => {
        console.log("Get data queries: ", queries)
        return queries.map((query, i) => {
            return (

                <Query key={i} query={getSceneQuery(query)}>
                    {({ loading, error, data }) => {
                        if (loading) return <ActivityIndicator color={'#fff'} />
                        if (error) return <Text>{`Error: ${error}`}</Text>

                        // TODO: Distinguish between "child" and "parent" checkpoints. Additionally filter out top-level scene's id?
                        console.log("Query data: ", data)
                        return (
                            <a-entity position="0 3 -4">

                                {this._renderScene(data.scene, [...data.scene.children, data.scene.parent])}
                            </a-entity>
                        )
                        // }

                    }}
                </Query>
            )
        })

    }

    _renderShipContainer = (scene, checkPoints) => { // Need to abstract this out asap
        const { containerNode, semanticLayoutNodes, id } = scene
        const { showInfoModal } = this.props

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

        return (
            <a-entity // CONTAINER NODE, CURRENTLY BLANK IF NOT CONTAINER SHIP
                id={id}
                position={`${containerNode.position.x} ${containerNode.position.y} ${0}`}
            >
                {makeCheckpoints(checkPoints, "child")}
                {makeCargoShips({ options: this.state.ships, showInfoModal, childData: formattedData })}
            </a-entity>
        )
    }

    _renderScene = (scene, checkpoints) => {
        const { semanticLayoutNodes, containerNode, children, parent } = scene
        const { id } = containerNode

        console.log("Render Scene data: ", scene)

        const nodes = semanticLayoutNodes.map((semanticLayoutNode, i) => {
            console.log("semanticLayoutNode: ", semanticLayoutNode)
            const { physicalModel, rotation, scale } = semanticLayoutNode
            const { physicalAsset } = physicalModel
            const { modelType, geometry } = physicalAsset

            if (modelType === "OBJ") {
                return this._make3dEntity({ semanticLayoutNode })
            } else if (modelType === "GEOMETRY" && geometry === "ship") {
                return this._renderShipContainer(scene, checkpoints)
            } else {
                return this._makePrimitiveEntity({ scale, modelType, name: physicalModel.name })
            }
        })

        console.log("Nodes: ", nodes)
        return (
            <a-entity
                position={`${containerNode.position.x} ${containerNode.position.y} ${-6}`}
            >
                {makeCheckpoints(checkpoints)}
                {nodes}
            </a-entity>
        )
    }

    _make3dEntity = (props) => {
        const { semanticLayoutNode } = props
        const { physicalModel, rotation, position, scale, id, name } = semanticLayoutNode
        const { physicalAsset } = physicalModel
        console.log("Make 3d entity name: ", name)
        return (
            <a-entity>
                <a-entity
                    scale={`${1} ${1} ${1}`}
                    id={id}
                    rotation={`${rotation.x} ${rotation.y} ${rotation.z}`}
                    position={`${position.x} ${position.y} ${position.z}`}
                    obj-model={`obj: #${physicalAsset.name}-obj;`}
                >
                    <a-animation attribute="rotation"
                        dur="30000"
                        fill="forwards"
                        to="0 360 0"
                        repeat="indefinite"></a-animation>
                </a-entity>
            </a-entity>
        )
    }

    _makePrimitiveEntity = (props) => {
        console.log("Make primitive entity props: ", props)
        const { scale, name = "box" } = props

        return (
            <a-entity
                geometry={`primitive: box;`}
                material="color: orangered"
            >
                <a-animation attribute="rotation"
                    dur="30000"
                    fill="forwards"
                    to="0 360 0"
                    repeat="indefinite"></a-animation>
            </a-entity>
        )
    }

    // TODO: Broken maybe?:


    render() {

        // Container node references
        console.log("New Scene props: ", this.props)

        return (
            <a-entity>
                {this._getQueryData(this.props.queries)}
            </a-entity>
        )
    }
}

export default Scene
