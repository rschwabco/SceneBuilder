import React from "react"

export const checkpoints = (props) => {
    console.log("Checkpoint props: ", props)

    // const makeCheckpoints = () => lookAt.map((point, i) => {
    //     return (
    //         <a-box
    //             id={`${point}-checkpoint-${i}`}
    //             camera-to-here={`cameraTo: ${6 + x} ${3.5 + y} ${-20 + z}; lookAt: #${props.lookAt}`}
    //             color={`${i === 0 ? "teal" : "palevioletred"}`}
    //             position={`${i === 0 ? "5" : "-5"} 0 -15`}
    //         >
    //         </a-box>
    //     )
    // })
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
            {/* <a-box
                id="checkpoint-1"
                camera-to-here={`cameraTo: ${6 + x} ${3.5 + y} ${-20 + z}; lookAt: #${props.lookAt}`}
                color="yellow"
                position="5 0 -15"
            >
            </a-box>

            <a-box
                id="checkpoint-3"
                color="palevioletred"
                position="-5 0 -15"
                camera-to-here={`cameraTo: ${-6 + x} ${3.5 + y} ${-20 + z}; lookAt: #${props.lookAt}`}
            >
            </a-box>
            <a-box
                id="checkpoint-2"
                color="teal"
                position="-5 0 4"
                camera-to-here={`cameraTo: ${-6 + x} ${3.5 + y} ${6 + z}; lookAt: #${props.lookAt}`}
            >
            </a-box>
            <a-box
                camera-to-here={`cameraTo: ${6 + x} ${3.5 + y} ${6 + z}; lookAt: #${props.lookAt}`}
                id="checkpoint-4"
                color="orangered"
                position="5 0 4"
            >
            </a-box> */}
        </a-entity>
    )
}