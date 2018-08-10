import React from "react"

export const checkpoints = (props) => {
    return (
        <a-entity>
            <a-box
                id="checkpoint-1"
                camera-to-here={`cameraTo: 6 3.5 -20; lookAt: #${props.lookAt}`}
                color="yellow"
                position="5 0 -15"
            >
            </a-box>

            <a-box
                id="checkpoint-3"
                color="palevioletred"
                position="-5 0 -15"
                camera-to-here={`cameraTo: -6 3.5 -20; lookAt: #${props.lookAt}`}
            >
            </a-box>
            <a-box
                id="checkpoint-2"
                color="teal"
                position="-5 0 4"
                camera-to-here={`cameraTo: -6 3.5 6; lookAt: #${props.lookAt}`}
            >
            </a-box>
            <a-box
                camera-to-here={`cameraTo: 6 3.5 6; lookAt: #${props.lookAt}`}
                id="checkpoint-4"
                color="orangered"
                position="5 0 4"
            >
            </a-box>
        </a-entity>
    )
}