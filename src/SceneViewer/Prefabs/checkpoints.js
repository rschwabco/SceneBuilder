import React from "react"

export const checkpoints = (props, node) => {
    console.log(`Checkpoint props from ${node}: `, props)

    const makeCheckpoints = () => props.map((point, i) => {
        const { id, containerNode } = point
        const { position } = containerNode
        const { x, y, z } = position
        return (
            <a-box
                id={`${point}-checkpoint-${i}`}
                camera-to-here={`cameraTo: ${6 + x} ${3.5 + y} ${-20 + z}; lookAt: #${id}`}
                color={`${i === 0 ? "teal" : "palevioletred"}`}
                position={`${i === 0 ? "5" : "-5"} 0 -15`}
            >
            </a-box>
        )
    })
    return (
        <a-entity>
            {makeCheckpoints()}
        </a-entity>
    )
}