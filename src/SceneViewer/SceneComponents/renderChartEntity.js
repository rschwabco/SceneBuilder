import React, { Component } from 'react'
import * as aframe from 'aframe'
import BoxContainer from "../BoxContainer"

export const renderChartEntity = (props) => {
    const { semanticLayoutNode, scene, i, dims } = props
    const { physicalModel, rotation, position, scale, name, chart = "CHART" } = semanticLayoutNode

    const chartDims = dims * 1.5
    console.log("Chart dims:")
    // return null
    return (
        <BoxContainer
            color="yellow"
            dimensions={{
                x: chartDims,
                y: chartDims,
                z: chartDims
            }}
            position={{ ...semanticLayoutNode.position }}
        >
            <a-entity
                position={`${-chartDims / 2} ${-chartDims / 2} 0`}
                id="bars"
                barchart={`width: ${chartDims} ;height: ${chartDims} ;gridson:true;title: ${chart} ;src:#barsdata`}
            ></a-entity>
        </BoxContainer>
    )
}