import React from "react"

export const makeCheckpoints = (props, node) => {
    console.log(`Checkpoint props`, props)

    const constructCheckpoints = () => props.map((point, i) => {
        const { id, containerNode } = point
        const { position } = containerNode
        const { x, y, z } = position
        const dim = 0.3
        return (
            <a-box
                className="checkpoint-box"
                camera-to-here={`cameraTo: ${0 + x} ${4 + y} ${5 + z}; lookAt: #${id}`}
                color={`orangered`}
                position={`${6} ${(i * 3) + 1.5} 3`}
                height={`${dim}`}
                width={`${dim}`}
                depth={`${dim}`}
            >
                <a-text position="0 1 0" value={`Click to show part# ${id}`}></a-text>
            </a-box>
        )
    })
    return (
        <a-entity>
            {constructCheckpoints()}
        </a-entity>
    )
}