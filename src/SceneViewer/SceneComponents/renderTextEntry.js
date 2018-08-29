import React, { Component } from 'react'
import * as aframe from 'aframe'
import BoxContainer from "../BoxContainer"

export const renderTextEntity = (props) => {
    const { semanticLayoutNode, scene, i, dims } = props
    const { physicalModel, rotation, position, scale, name, text = "TEXT TEXT TEXT" } = semanticLayoutNode
    const { physicalAsset } = physicalModel

    return (
        <BoxContainer
            color="red"
            dimensions={{
                x: 2 * dims,
                y: dims,
                z: dims
            }}
            position={{ ...semanticLayoutNode.position }}
        >
            <a-text scale="2 2 2" align="center" position={`${0} ${0} ${0}`} value={text}></a-text>
        </BoxContainer>
    )

}


