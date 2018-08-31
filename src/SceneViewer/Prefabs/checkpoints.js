import React from "react"

export const makeCheckpoints = (props, node) => {

    const constructCheckpoints = () => props.map((point, i) => {
        const { id, containerNode } = point
        const { position } = containerNode
        const { x, y, z } = position
        const dim = 0.6
        return (
            <a-box
                className="checkpoint-box"
                // camera-to-here={`cameraTo: ${0 + x} ${4 + y} ${5 + z}; lookAt: #${id}`}
                camera-to-here={`cameraTo: ${0} ${4} ${5}; lookAt: #${id}`}
                look-at="#cameraLookAt"
                opacity="0.3"
                position={`${i === 0 ? 6 : -6} ${-1} 3`}
                height={`${dim}`}
                width={`${dim}`}
                depth={`${dim}`}
            >
                <a-box
                    wireframe
                    position="0 0 0"
                    height={`${dim}`}
                    width={`${dim}`}
                    depth={`${dim}`}
                ></a-box>
                <a-text align="center" color="white" position="0 0 0" value={i === 0 ? "Next" : "Last"}></a-text>
            </a-box>
        )
    })
    return (
        <a-entity>
            {constructCheckpoints()}
        </a-entity>
    )
}