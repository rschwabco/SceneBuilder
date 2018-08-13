import React from "react"

export const checkpoints = (props) => {
    console.log("Checkpoint props: ", props)

    const makeCheckpoints = () => props.map((point, i) => {
        const { lookAt, offset } = point
        const { x, y, z } = offset
        return (
            <a-box
                // id={`${point}-checkpoint-${i}`}
                camera-to-here={`cameraTo: ${6 + x} ${3.5 + y} ${-20 + z}; lookAt: #${lookAt}`}
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