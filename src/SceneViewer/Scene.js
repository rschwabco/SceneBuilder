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
import BoxContainer from "./BoxContainer"



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
    }


    _getQueryData = (queries) => {
        // console.log("Get data queries: ", queries)
        return queries.map((query, sceneIndex) => {
            return (

                <Query key={sceneIndex} query={getSceneQuery(query)}>
                    {({ loading, error, data }) => {
                        if (loading) return <ActivityIndicator color={'#fff'} />
                        if (error) return <Text>{`Error: ${error}`}</Text>

                        // TODO: Distinguish between "child" and "parent" checkpoints. Additionally filter out top-level scene's id?
                        // console.log("Query data: ", data)
                        return (
                            <a-entity position="0 3 -4">
                                {data.scene.id !== "cjl4hc0z3camy0b77y1ameusu" && this._renderScene(data.scene, [...data.scene.children, data.scene.parent], sceneIndex)}
                                {/* {this._renderScene(data.scene, [...data.scene.children, data.scene.parent])} */}
                            </a-entity>
                        )

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

        const dims = 9

        return (
            <BoxContainer
                position={`${containerNode.position.x} ${containerNode.position.y} ${containerNode.position.z}`}
                dims={dims}
            >
                <a-entity id={id}>
                    {makeCargoShips({ options: this.state.ships, showInfoModal, childData: formattedData })}
                </a-entity>
            </BoxContainer>
        )
    }

    _renderScene = (scene, checkpoints, sceneIndex) => {
        const { semanticLayoutNodes, containerNode, children, parent, pq, id } = scene
        console.log("Scene id: ", id)

        // console.log("Render Scene data: ", scene)

        const nodes = semanticLayoutNodes.map((semanticLayoutNode, i) => {
            // console.log("semanticLayoutNode: ", semanticLayoutNode)
            const { physicalModel, rotation, scale } = semanticLayoutNode
            const { physicalAsset } = physicalModel
            const { modelType, geometry } = physicalAsset

            const dims = 2
            return (
                <a-entity
                // scale={`${1 / divideBy} ${1 / divideBy} ${1 / divideBy}`}
                >
                    {semanticLayoutNode.text && this._makeTextEntity({ semanticLayoutNode, scene, i, dims })}
                    {semanticLayoutNode.chart && this._makeChartEntity({ semanticLayoutNode, scene, i, dims })}
                    {semanticLayoutNode.physicalModel
                        && semanticLayoutNode.physicalModel.physicalAsset
                        && semanticLayoutNode.physicalModel.physicalAsset.modelType
                        && semanticLayoutNode.physicalModel.physicalAsset.modelType === "OBJ"
                        && this._make3dEntity({ semanticLayoutNode, scene, i, dims })
                    }
                    {semanticLayoutNode.physicalModel
                        && semanticLayoutNode.physicalModel.physicalAsset
                        && semanticLayoutNode.physicalModel.physicalAsset.modelType
                        && semanticLayoutNode.physicalModel.physicalAsset.modelType === "GEOMETRY"
                        && semanticLayoutNode.physicalModel.physicalAsset.geometry === "ship"
                        && this._renderShipContainer({ semanticLayoutNode, scene, i, dims })
                    }
                </a-entity>
            )

            // if (modelType === "OBJ") {
            //     return this._make3dEntity({ semanticLayoutNode, scene, i })
            // } else if (modelType === "GEOMETRY" && geometry === "ship") {
            //     return this._renderShipContainer(scene, checkpoints)
            // } else {
            //     return this._makePrimitiveEntity({ scale, modelType, name: physicalModel.name, i, scene, semanticLayoutNode })
            // }
        })

        const getScale = () => {
            console.log("Prop id: ", this.props.currentScene.replace(/^#+/i, ''))
            console.log("Own id: ", id.replace(/^#+/i, ''))
            return this.props.currentScene.replace(/^#+/i, '') === id.replace(/^#+/i, '') ? 1.3 : 0.05
        }

        // console.log("Nodes: ", nodes)
        return (
            <a-sphere
                id={id}
                wireframe={true}
                radius="13"
                className="container"
                scale={`${getScale(sceneIndex)} ${getScale(sceneIndex)} ${getScale(sceneIndex)}`}
                position={`${containerNode.position.x} ${containerNode.position.y} ${containerNode.position.z - 4}`}
            >
                {makeCheckpoints(checkpoints)}
                {nodes}
                <a-box
                    width="6"
                    height="2"
                    wireframe={true}
                    position={`0 -1.5 4`}
                >
                    <a-box
                        width="6"
                        height="2"
                        position="0 0 0"
                        color="#1bf222"
                        opacity="0.2"
                    >
                        <a-text
                            align="center"
                            position="0 0 0 "
                            value={`${pq.text}`}
                        ></a-text>
                    </a-box>
                </a-box>
            </a-sphere>
        )
    }

    _renderShipContainer = (props) => { // Need to abstract this out asap

        const { semanticLayoutNode, scene, i, dims } = props
        const { showInfoModal } = this.props

        return (
            <a-entity
                position={`${semanticLayoutNode.position.x} ${semanticLayoutNode.position.y - .5} ${semanticLayoutNode.position.z}`}
            >
                {makeCargoShips({ options: this.state.ships, showInfoModal })}
            </a-entity>
        )
    }

    _makeTextEntity = (props) => {
        const { semanticLayoutNode, scene, i, dims } = props
        const { physicalModel, rotation, position, scale, name, text = "TEXT TEXT TEXT" } = semanticLayoutNode
        const { physicalAsset } = physicalModel

        return (
            <BoxContainer
                color="red"
                dims={dims}
                width={2 * dims}
                position={`${semanticLayoutNode.position.x} ${semanticLayoutNode.position.y} ${semanticLayoutNode.position.z}`}
            >
                <a-text scale="2 2 2" align="center" position={`${0} ${0} ${0}`} value={text}></a-text>
            </BoxContainer>
        )

    }

    _makeChartEntity = (props) => {
        const { semanticLayoutNode, scene, i, dims } = props
        const { physicalModel, rotation, position, scale, name, chart = "CHART" } = semanticLayoutNode

        const chartDims = dims * 1.5
        // return null
        return (
            <BoxContainer
                color="yellow"
                dims={chartDims}
                position={`${semanticLayoutNode.position.x} ${semanticLayoutNode.position.y} ${semanticLayoutNode.position.z}`}
            >
                <a-entity

                    position={`${-chartDims / 2} ${-chartDims / 2} 0`}
                    id="bars"
                    barchart={`width: ${chartDims} ;height: ${chartDims} ;gridson:true;title: ${chart} ;src:#barsdata`}
                ></a-entity>
            </BoxContainer>
        )
    }

    _make3dEntity = (props) => {
        const { semanticLayoutNode, scene, i, dims } = props
        const { physicalModel, rotation, position, scale, name } = semanticLayoutNode
        const { physicalAsset, id } = physicalModel
        // console.log("Make 3d entity name: ", name)
        // console.log("Obj to render: ", props)

        // TODO: Use scale from SLN
        const getScale = () => {
            switch (id) {
                case "cjl7hvt1gkdiz0b77prl5j0bm":
                    return 0.25
                case "cjl7ip5zrkfu50b77wz62vdlt":
                    return 0.008
                case "cjl7j1g7kkgqn0b77milioq62":
                    return 0.015
                case "cjl7j53afkh1c0b77dax7zkik":
                    return 0.018
                case "cjl7jbtsxkhll0b776uo1vott":
                    return 0.12
                default: return 0.4
            }
        }

        const getColor = () => {
            switch (id) {
                case "cjl7hvt1gkdiz0b77prl5j0bm":
                    return "orange"
                default: return "#00c5f5"
            }
        }
        return (
            <BoxContainer
                color={getColor()}
                dims={dims}
                position={`${semanticLayoutNode.position.x} ${semanticLayoutNode.position.y} ${semanticLayoutNode.position.z}`}
            >
                <a-entity
                    scale={`${getScale()} ${getScale()} ${getScale()}`}
                    position={`${0} ${-.5} ${0}`}

                    obj-model={`obj: #${physicalAsset.name}-obj;`}
                >
                    <a-animation attribute="rotation"
                        dur="30000"
                        fill="forwards"
                        to="0 360 0"
                        repeat="indefinite"></a-animation>
                </a-entity>
            </BoxContainer>
        )
    }

    _makePrimitiveEntity = (props) => {
        // console.log("Make primitive entity props: ", props)
        const { scale, name = "box", i = 0, scene, semanticLayoutNode } = props
        const { text = null, chart = null } = semanticLayoutNode
        let color = "#03A9F4"
        if (text) { color = "red" }
        if (chart) { color = "yellow" }
        const dims = 6
        return (

            <a-entity
                id={scene.id}
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
        // console.log("New Scene props: ", this.props)

        return (
            <a-entity>
                {this._getQueryData(this.props.queries)}
            </a-entity>
        )
    }
}

export default Scene




