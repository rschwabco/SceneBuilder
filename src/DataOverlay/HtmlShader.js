import 'aframe'
import 'aframe-html-shader'
import React from "react"

export const HtmlShader = (props) => {
    console.log("Html Shader Props: ", props)
    const { overlayText, position = { x: 0, y: 0, z: 0 } } = props
    const { x, y, z } = position
    const makeTextItems = () => {
        let textArray = []
        for (let text of overlayText) {
            textArray.push(
                <p style={{ border: "1px #FFF", color: "#FFF" }}>
                    {text}
                </p>
            )
            if (textArray.length < (overlayText.length * 2) - 1) {
                textArray.push(<div style={{ color: "#303F9F", backgroundColor: "#303F9F", height: 2, width: "100%"}} />)
            }
        }
        return textArray
    }
    return (
        <a-entity position={`${x} ${y} ${z}`}>
            <a-plane material={`shader: html; target: #planeHTML-${props.id}; ratio: height; transparent: true; side: double`} position="0 1 0" scale="2 2 2"></a-plane>
            <div
                id={`planeHTML-${props.id}`}
                style={{
                    background: "#3F51B5",
                    border: "3px solid #303F9F",
                    borderRadius: 5,
                    width: 500,
                    fontSize: 54,
                    color: "#222",
                    fontWeight: 600,
                    overflow: "scroll",
                    textAlign: "center"
                }}
            >
                {makeTextItems()}
            </div>

            <a-entity line={`start: 0, 0, 0; end: ${-x / 2} ${-y / 2} ${-z / 2}; color: red`}></a-entity>
        </a-entity >
    )
}