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

import SceneContainer from "./SceneComponents/SceneContainer"

import {
    renderShipContainer,
    renderTextEntity,
    renderChartEntity,
    render3dEntity,
    renderProblemQuestion,
    renderPrimitiveEntity
} from "./SceneComponents"


class Scene extends Component {
    constructor(props) {
        super(props)
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
                                {data.scene.id !== "cjl4hc0z3camy0b77y1ameusu" &&
                                    this._renderScene(
                                        data.scene,
                                        [...data.scene.children, data.scene.parent],
                                        sceneIndex)
                                }
                            </a-entity>
                        )

                    }}
                </Query>
            )
        })

    }


    _renderScene = (scene, checkpoints, sceneIndex) => {
        const { semanticLayoutNodes, containerNode, children, parent, pq, id } = scene
        console.log("Scene id: ", id)

        console.log("Render Scene data: ", scene)

        const nodes = semanticLayoutNodes.map((semanticLayoutNode, i) => {
            // console.log("semanticLayoutNode: ", semanticLayoutNode)
            const { physicalModel, rotation, scale } = semanticLayoutNode
            const { physicalAsset } = physicalModel
            const { modelType, geometry } = physicalAsset

            const dims = 2
            return (
                <a-entity
                    id={`renderScene-${id}`}
                // scale={`${1 / divideBy} ${1 / divideBy} ${1 / divideBy}`}
                >
                    {semanticLayoutNode.text && renderTextEntity({ semanticLayoutNode, scene, i, dims })}
                    {semanticLayoutNode.chart && renderChartEntity({ semanticLayoutNode, scene, i, dims })}
                    {semanticLayoutNode.physicalModel
                        && semanticLayoutNode.physicalModel.physicalAsset
                        && semanticLayoutNode.physicalModel.physicalAsset.modelType
                        && semanticLayoutNode.physicalModel.physicalAsset.modelType === "OBJ"
                        && render3dEntity({ semanticLayoutNode, scene, i, dims })
                    }
                    {semanticLayoutNode.physicalModel
                        && semanticLayoutNode.physicalModel.physicalAsset
                        && semanticLayoutNode.physicalModel.physicalAsset.modelType
                        && semanticLayoutNode.physicalModel.physicalAsset.modelType === "GEOMETRY"
                        && semanticLayoutNode.physicalModel.physicalAsset.geometry === "ship"
                        && renderShipContainer({ semanticLayoutNode, scene, i, dims, showInfoModal: this.props.showInfoModal }) // TODO: remove showInfoModal?
                    }
                </a-entity>
            )
        })

        const getScale = () => {
            return this.props.currentScene.replace(/^#+/i, '') === id.replace(/^#+/i, '') ? 1.3 : 0.01
        }

        return (
            <SceneContainer
                key={id}
                id={id}
                nextScale={1.3}
            >
                <a-entity>
                    {makeCheckpoints(checkpoints)}
                    {nodes}
                    {renderProblemQuestion(pq.text)}
                </a-entity>
            </SceneContainer>
        )
    }


    render() {

        return (
            <a-entity>
                {this._getQueryData(this.props.queries)}
            </a-entity>
        )
    }
}

export default Scene




