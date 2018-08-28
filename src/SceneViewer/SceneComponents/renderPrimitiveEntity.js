import React, { Component } from 'react'
import * as aframe from 'aframe'
import BoxContainer from "../BoxContainer"

export const renderPrimitiveEntity = (props) => {
    // console.log("Make primitive entity props: ", props)
    const { scale, name = "box", i = 0, scene, semanticLayoutNode } = props
    const { text = null, chart = null } = semanticLayoutNode
    let color = "#03A9F4"
    if (text) { color = "red" }
    if (chart) { color = "yellow" }
    const dims = 6
    return (

        <a-entity
            id={scene.id}
            geometry={`primitive: box;`}
            material="color: orangered"
        >
            <a-animation attribute="rotation"
                dur="30000"
                fill="forwards"
                to="0 360 0"
                repeat="indefinite"></a-animation>
        </a-entity>
    )
}