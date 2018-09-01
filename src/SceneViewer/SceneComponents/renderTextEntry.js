import React from 'react'
import * as aframe from 'aframe'
import BoxContainer from "../BoxContainer"

export const renderTextEntity = (props) => {
    const { semanticLayoutNode, dims } = props
    const { text = "TEXT TEXT TEXT" } = semanticLayoutNode

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


