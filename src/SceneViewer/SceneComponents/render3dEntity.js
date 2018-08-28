import React, { Component } from 'react'
import * as aframe from 'aframe'
import BoxContainer from "../BoxContainer"

export const render3dEntity = (props) => {
    const { semanticLayoutNode, scene, i, dims } = props
    const { physicalModel, rotation, position, scale, name } = semanticLayoutNode
    const { physicalAsset, id } = physicalModel
    // console.log("Make 3d entity name: ", name)
    // console.log("Obj to render: ", props)

    // TODO: Use scale from SLN
    const getScale = () => {
        switch (id) {
            case "cjl7hvt1gkdiz0b77prl5j0bm":
                return 0.25
            case "cjl7ip5zrkfu50b77wz62vdlt":
                return 0.008
            case "cjl7j1g7kkgqn0b77milioq62":
                return 0.015
            case "cjl7j53afkh1c0b77dax7zkik":
                return 0.018
            case "cjl7jbtsxkhll0b776uo1vott":
                return 0.12
            default: return 0.4
        }
    }

    const getColor = () => {
        switch (id) {
            case "cjl7hvt1gkdiz0b77prl5j0bm":
                return "orange"
            default: return "#00c5f5"
        }
    }
    return (
        <BoxContainer
            color={getColor()}
            dims={dims}
            position={`${semanticLayoutNode.position.x} ${semanticLayoutNode.position.y} ${semanticLayoutNode.position.z}`}
        >
            <a-entity
                scale={`${getScale()} ${getScale()} ${getScale()}`}
                position={`${0} ${-.5} ${0}`}

                obj-model={`obj: #${physicalAsset.name}-obj;`}
            >
                <a-animation attribute="rotation"
                    dur="30000"
                    fill="forwards"
                    to="0 360 0"
                    repeat="indefinite"></a-animation>
            </a-entity>
        </BoxContainer>
    )
}