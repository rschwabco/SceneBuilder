import React, { Component } from 'react'
import * as aframe from 'aframe'
import BoxContainer from "../BoxContainer"
import BarChart from "./BarChart"

export const renderChartEntity = (props) => {
    const { semanticLayoutNode, dims } = props
    const { chart = "CHART" } = semanticLayoutNode

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
            <BarChart chartDims={chartDims} chart={chart} />
        </BoxContainer>
    )
}