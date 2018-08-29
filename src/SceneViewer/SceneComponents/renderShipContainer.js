import React, { Component } from 'react'
import * as aframe from 'aframe'
import { makeCheckpoints, makeCargoShips } from "../Prefabs"
import { render3dEntity } from "./render3dEntity"



export const renderShipContainer = (props) => { // Need to abstract this out asap

    const { semanticLayoutNode, scene, i, dims, showInfoModal } = props
    console.log("Ship semantic layout node: ", semanticLayoutNode)

    const ships = [ //REMOVE ASAP
        {
            overlayText: [
                "Propeller health: 75%",
                "Fuel Levels: 95%"
            ]
        }, {
            overlayText: [
                "Propeller health: 25% *",
                "Engine health: 99%",
                "Rudder health: 82%"
            ]
        }
    ]

    return (
        <a-entity
            position={`${semanticLayoutNode.position.x} ${semanticLayoutNode.position.y - .5} ${semanticLayoutNode.position.z}`}
        >
            {makeCargoShips({ ships, showInfoModal })}
            {semanticLayoutNode.childNodes.map((childNode, i) => {
                return render3dEntity({ semanticLayoutNode: childNode, dims: 3 })
            })}
        </a-entity>
    )
}