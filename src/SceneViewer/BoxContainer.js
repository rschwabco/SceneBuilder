import React, { Component } from 'react'
import * as aframe from 'aframe'

const BoxContainer = (props) => {
    const { dims, i = 0, color = "#03A9F4", position = null, width } = props
    return (
        <a-box
            key={i}
            position={position ? position : `${0} ${i * (dims + 1)} ${0}`}
            height={`${dims}`}
            width={`${width ? width : dims}`}
            depth={`${dims}`}
            opacity="0.3"
            color={color}
        >
            <a-box
                position={`${0} ${0} ${0}`}
                height={`${dims}`}
                width={`${width ? width : dims}`}
                depth={`${dims}`}
                wireframe
            >
            </a-box>
            {props.children}
        </a-box>
    )
}

export default BoxContainer