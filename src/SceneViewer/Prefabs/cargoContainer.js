import React from "react"
import { sample } from "underscore"

const containerColors = () => sample([
    "#03A9F4",
    "#FFEB3B",
    "#757575",
    "#FF4081",
    "#7B1FA2"
])


export const makeCargoContainers = (options) => {
    const { rowNumber, showInfoModal, color } = options
    const containerWidth = 0.3
    const platformWidth = 2
    const rowZ = 0.75 * rowNumber
    let containers = []


    for (let i = -0.83; containers.length < 6; i += (containerWidth + 0.03)) {
        containers.push(
            <a-box
                key={i}
                color={color}
                width={containerWidth}
                outline="thickness: 0; color: red"
                position={`${i} 1.155 ${-0.355 - rowZ}`}
                height=".3"
                depth=".7"
            // wireframe={wireframe}
            >
            </a-box>
        )
    }

    return containers
}