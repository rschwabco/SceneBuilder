import 'aframe'
import 'aframe-html-shader'
import React from "react"

export const HtmlShader = () => {
    return (
        <a-entity>
            <a-entity geometry="primitive: box" material="shader: html; target: #boxHTML" position="0 0 -5"></a-entity>
            <a-plane material="shader: html; target: #planeHTML; ratio: height; transparent: true; side: double" position="0 2 -6"></a-plane>

            <div
                style={{

                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    zIndex: -1,
                    overflow: "hidden"
                }}
            >
                <div
                    id="boxHTML"
                    style={{
                        backgroundImage: "url(require(https://raw.githubusercontent.com/mayognaise/aframe-html-shader/master/examples/basic/cheesecake.png))",
                        color: "white",
                        width: 500,
                        height: 500,
                        fontSize: 64,
                        fontFamily: "monospace",
                        textAlign: "center"
                    }}
                >
                    <p
                        style={{
                            background: "rgb(30, 30, 30)",
                            position: "absolute",
                            top: 25,
                            width: 500
                        }}
                    >CHEESECAKE FOR YOU</p>
                </div>
            </div>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    zIndex: -1,
                    overflow: "hidden"
                }}
            >
                <div
                    id="planeHTML"
                    style={{
                        background: "linear-gradient(red, yellow, green)",
                        width: 500,
                        height: 200,
                        fontSize: 64,
                        paddingTop: 15,
                        color: "#222",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: 200
                    }}
                >
                    <p
                        style={{ border: "1px #FFF" }}
                    >ARE YOU HUNGRY?</p>
                </div>
            </div>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    zIndex: -1,
                    overflow: "hidden"
                }}>
                <div
                    id="skyHTML"
                    style={{
                        background: "linear-gradient(to top, #222, #EEE)",
                        width: 500,
                        height: 800,
                        fontSize: 100,
                        color: "#111"
                    }}
                >
                    <p>WELCOME</p>
                    <p>HA HA HA</p>
                    <p>DON'T LOOK DOWN</p>
                </div>
            </div>
        </a-entity>
    )
}