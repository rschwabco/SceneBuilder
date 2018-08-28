import React, { Component } from 'react'
import * as aframe from 'aframe'
import BoxContainer from "../BoxContainer"

export const renderProblemQuestion = text => {
    return (
        <a-box
            width="6"
            height="2"
            wireframe={true}
            position={`0 -1.5 4`}
        >
            <a-box
                width="6"
                height="2"
                position="0 0 0"
                color="#1bf222"
                opacity="0.2"
            >
                <a-text
                    align="center"
                    position="0 0 0 "
                    value={`${text}`}
                ></a-text>
            </a-box>
        </a-box>
    )
}