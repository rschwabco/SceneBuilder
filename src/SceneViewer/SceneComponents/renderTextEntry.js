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
            dims={dims}
            width={2 * dims}
            position={`${semanticLayoutNode.position.x} ${semanticLayoutNode.position.y} ${semanticLayoutNode.position.z}`}
        >
            <a-text scale="2 2 2" align="center" position={`${0} ${0} ${0}`} value={text}></a-text>
        </BoxContainer>
    )

}