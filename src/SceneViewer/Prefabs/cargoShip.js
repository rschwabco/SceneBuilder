import React from "react"
import { makeCargoContainers } from "./cargoContainer"
import { HtmlShader } from "../../DataOverlay/HtmlShader"

export const makeCargoShips = (props) => {
    const { ships, color } = props
    // console.log("Child data: ", childData)

    const wireframe = false // Play with these!
    const containerWireframe = false  // Play with these!


    console.log("make Cargo ship with: ", props)
    return (
        <a-entity
            position={`0 0 0`}
            click-log-info
        >
            <a-sphere
                wireframe={wireframe}
                // hover-info
                color="#FFF"
                theta-length="90"
                phi-length="180"
                rotation="180 180 0"
                position="0 1 0"
                side="double"
            // wireframe="true"
            ></a-sphere>
            <a-ring
                wireframe={wireframe}
                color="#FFF"
                radius-inner=".001"
                radius-outer="1"
                position="0 .995 0"
                rotation="270 0 0"
            ></a-ring>
            <a-cylinder
                wireframe={wireframe}
                side="double"
                color="#FFF"
                theta-length="180"
                theta-start="270"
                height="3.5"
                position="0 1 -1.75"
                rotation="90 0 0"
            ></a-cylinder>
            <a-sphere
                wireframe={wireframe}
                side="double"
                color="#FFF"
                theta-length="90"
                phi-length="180"
                rotation="90 180 0"
                position="0 1 -3.5"
            >
            </a-sphere>
            <a-ring
                wireframe={wireframe}
                color="#FFF"
                radius-inner=".001"
                radius-outer="1"
                position="0 .995 -3.5"
                rotation="270 0 0"
            ></a-ring>
            <a-box
                wireframe={wireframe}
                side="double"
                color="#FFF"
                position="0 0.975 -1.75"
                depth="3.5"
                width="2"
                height="0.05"
            >
            </a-box>

            {makeCargoContainers({ rowNumber: 0, wireframe: containerWireframe, color })}
            {makeCargoContainers({ rowNumber: 1, wireframe: containerWireframe, color })}
            {makeCargoContainers({ rowNumber: 2, wireframe: containerWireframe, color })}
            {makeCargoContainers({ rowNumber: 3, wireframe: containerWireframe, color })}
            <a-box
                wireframe={wireframe}
                color="#FFF"
                depth=".3"
                height=".8"
                width="1"
                position="0 1.4 -3.258"
            ></a-box>
            <a-box
                wireframe={wireframe}
                color="#FFF"
                depth=".3"
                height=".2"
                width="0.2"
                position="-.6 1.7 -3.258"
            ></a-box>
            <a-box
                wireframe={wireframe}
                color="#FFF"
                depth=".3"
                height=".2"
                width="0.2"
                position=".6 1.7 -3.258"
            ></a-box>
            {/* {showInfoModal && // Add dynamic assets here
                <a-entity>
                    {makeChildEntities()}
                    <HtmlShader id={i} overlayText={ship.overlayText} position={{ x: 2, y: 2, z: -2 }}
                    />
                </a-entity>
            } */}
        </a-entity>
    )


}