import React, { Component } from 'react'
import * as aframe from 'aframe'

const BoxContainer = (props) => {
    const {
        i = 0,
        color = "#03A9F4",
        position = {
            x: 0,
            y: 0,
            z: 0
        },
        dimensions
    } = props



    return (
        <a-box
            key={i}
            position={`${position.x} ${position.y} ${position.z}`}
            height={`${dimensions.y}`}
            width={`${dimensions.x}`}
            depth={`${dimensions.y}`}
            opacity="0.3"
            color={color}
        >
            <a-box
                position={`${0} ${0} ${0}`}
                height={`${dimensions.y}`}
                width={`${dimensions.x}`}
                depth={`${dimensions.y}`}
                wireframe
            >
            </a-box>
            {props.children}
        </a-box>
    )
}

export default BoxContainer