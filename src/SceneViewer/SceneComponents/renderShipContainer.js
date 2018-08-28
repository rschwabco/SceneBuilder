import React, { Component } from 'react'
import * as aframe from 'aframe'
import { makeCheckpoints, makeCargoShips } from "../Prefabs"



export const renderShipContainer = (props) => { // Need to abstract this out asap

    const { semanticLayoutNode, scene, i, dims, showInfoModal } = props

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
            {makeCargoShips({ options: ships, showInfoModal })}
        </a-entity>
    )
}