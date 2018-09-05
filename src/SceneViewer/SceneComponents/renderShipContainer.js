import React from 'react'
import * as aframe from 'aframe'
import { makeCargoShips } from "../Prefabs"
import { render3dEntity } from "./render3dEntity"



export const renderShipContainer = (props) => { // Need to abstract this out asap

    const { semanticLayoutNode } = props
    const { needsRepair } = semanticLayoutNode

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

    const getColor = shipName => {
        switch (shipName) {
            case "tree-rings-Vessel-1":
            case "tree-rings-fleet-Vessel-1":
                return "#03A9F4"
            case "tree-rings-fleet-Vessel-2":
            case "tree-rings-Vessel-2":
                return "#FFEB3B";
            case "tree-rings-fleet-Vessel-3":
            case "tree-rings-Vessel-3":
                return "#FF4081"
            default: return "#FF4081"
        }
    }

    return (
        <a-entity
            position={`${semanticLayoutNode.position.x} ${semanticLayoutNode.position.y - .5} ${semanticLayoutNode.position.z}`}

        >
            {needsRepair && <a-box
                position="0 1 -1"
                color="red"
                opacity="0.3"
                width="3"
                height="2"
                depth="6"
            >

            </a-box>}
            {makeCargoShips({ ships, color: getColor(semanticLayoutNode.name) })}
            {semanticLayoutNode.childNodes.map((childNode, i) => {
                return render3dEntity({ semanticLayoutNode: childNode, dims: 3 })
            })}
        </a-entity>
    )
}