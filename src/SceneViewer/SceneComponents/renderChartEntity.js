import React, { Component } from 'react'
import * as aframe from 'aframe'
import BoxContainer from "../BoxContainer"
import BarChart from "./BarChart"

export const renderChartEntity = (props) => {
    const { semanticLayoutNode, dims } = props
    const { chart = "CHART" } = semanticLayoutNode

    const chartDims = dims * 1.5
    const getChartSourceId = () => {

        switch (chart) {
            case "Sensor 1 Reading":
                return "barsdata1"
            case "Sensor 2 Reading":
                return "barsdata2"
            case "Sensor 3 Reading":
                return "barsdata3"
            case "Sensor 4 Reading":
                return "barsdata4"
            case "Sensor 5 Reading":
                return "barsdata5"
            case "Sensor 6 Reading":
                return "barsdata6"
            default: return "barsdata1"
        }
    }
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
            <BarChart chartDims={chartDims} chart={chart} src={getChartSourceId()} />
        </BoxContainer>
    )
}