import React from "react"

export const checkpoints = (props, node) => {
    console.log(`Checkpoint props`, props)

    const makeCheckpoints = () => props.map((point, i) => {
        const { id, containerNode } = point
        const { position } = containerNode
        const { x, y, z } = position
        const dim = 0.2
        return (
            <a-box
                className="checkpoint-box"
                camera-to-here={`cameraTo: ${0 + x} ${0 + y} ${0 + z}; lookAt: #${id}`}
                color={`${i === 0 ? "teal" : "palevioletred"}`}
                position={`${5} ${(i * 3) + 1.5} .3`}
                height={`${dim}`}
                width={`${dim}`}
                depth={`${dim}`}
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