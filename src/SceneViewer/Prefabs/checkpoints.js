import React from "react"

export const checkpoints = (props, node) => {
    console.log(`Checkpoint props`, props)

    const makeCheckpoints = () => props.map((point, i) => {
        const { id, containerNode } = point
        const { position } = containerNode
        const { x, y, z } = position
        return (
            <a-box
                className="checkpoint-box"
                camera-to-here={`cameraTo: ${6 + x} ${3.5 + y} ${-20 + z}; lookAt: #${id}`}
                color={`${i === 0 ? "teal" : "palevioletred"}`}
                position={`${(i * 5) + 5} 0 -15`}
            >
                <a-text position="0 1 0" value={`Click to show ${id}`}></a-text>
            </a-box>
        )
    })
    return (
        <a-entity>
            {makeCheckpoints()}
        </a-entity>
    )
}