import React, { Component } from 'react'
import * as aframe from 'aframe'
import BoxContainer from "../BoxContainer"

export const render3dEntity = (props) => {
    const { semanticLayoutNode, dims } = props
    const { physicalModel, rotation, position, scale } = semanticLayoutNode
    const { physicalAsset, id, name } = physicalModel
    // console.log("Make 3d entity name: ", name)
    // console.log("Obj to render: ", props)

    console.log("semanticLayoutNode: ", semanticLayoutNode)
    console.log("semanticLayoutNode dimensions: ", semanticLayoutNode.dimensions)

    // TODO: Use scale from SLN
    const getScale = () => {
        console.log("render 3d entity id: ", id)
        console.log("render 3d entity name: ", name)
        console.log("render 3d entity SLN name: ", semanticLayoutNode.name)
        console.log("render 3d entity SLN id: ", semanticLayoutNode.id)
        console.log("render 3d entity SLN: ", semanticLayoutNode)
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
                return scale && scale.x ? scale.x : 1
            case "cjky8ddvj9ok80b29hca4qzbn":
                return scale && scale.x ? scale.x : 1
            default: return 0.4
        }
    }

    const getContainerWidth = () => {
        switch (id) {
            case "cjl7hvt1gkdiz0b77prl5j0bm":
                return dims
            case "cjl7ip5zrkfu50b77wz62vdlt":
                return dims
            case "cjl7j1g7kkgqn0b77milioq62":
                return dims
            case "cjl7j53afkh1c0b77dax7zkik":
                return dims
            case "cjl7jbtsxkhll0b776uo1vott":
                return 0.6
            case "cjky8ddvj9ok80b29hca4qzbn":
                return 0.3
            default: return dims
        }
    }

    const getYOffset = () => {
        switch (id) {
            case "cjl7jbtsxkhll0b776uo1vott":
                return -.3
            case "cjky8ddvj9ok80b29hca4qzbn":
                return -0.070
            default: return -.5
        }
    }
    const getColor = () => {
        switch (id) {
            case "cjl7hvt1gkdiz0b77prl5j0bm":
                return "orange"
            default: return "#00c5f5"
        }
    }

    const getYRotation = () => {
        switch (id) {
            case "cjl7jbtsxkhll0b776uo1vott":
                return 180
            case "cjky8ddvj9ok80b29hca4qzbn":
                return 0
            default: return 0
        }
    }
    return (
        <BoxContainer
            color={getColor()}
            dimensions={{
                x: getContainerWidth(),
                y: getContainerWidth(),
                z: getContainerWidth()
            }}
            position={{ ...semanticLayoutNode.position }}
        >
            <a-entity
                scale={`${getScale()} ${getScale()} ${getScale()}`}
                position={`${0} ${getYOffset()} ${0}`}
                rotation={`${0} ${getYRotation()} ${0}`}
                obj-model={`obj: #${physicalAsset.name}-obj;`}
            >
                {/* <a-animation attribute="rotation"
                    dur="30000"
                    fill="forwards"
                    to="0 360 0"
                    repeat="indefinite"></a-animation> */}
            </a-entity>
        </BoxContainer>
    )
}