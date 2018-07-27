import React from "react"

const Camera = () => {
    return (
        <a-entity position="0 0 3.8">
            <a-camera
                look-controls-enabled="true"
                keyboard-controls="fpsMode: true"
                mouse-cursor
            >
                <a-cursor fuse="true" color="yellow" />
            </a-camera>
        </a-entity>
    )
}

export default Camera