import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import registerClickDrag from "aframe-click-drag-component";
import { ContainerScene, CubeScene } from "./explorer/Scene"
import assets from "./aFrameAssets/aFrameAssets"
import { Entity, Scene } from "aframe-react";
registerClickDrag(aframe);
class Enviornment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 1000,
            roll: 0,
            pitch: 0,
            yaw: 0,
            x: 0,
            y: 0,
            z: -10,
            pinch: false
        };
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillReceiveProps(nextProps) { }

    componentWillUpdate(nextProps, nextState) { }

    componentDidUpdate(prevProps, prevState) { }

    componentWillUnmount() { }

    render() {
        let { pitch, roll, yaw, x, y, z } = this.state;

        return (
            <Scene vr-mode-ui keyboard-shortcuts leap="vr: false">

                {assets()}

                <Entity>
                    {this.props.children}

                    <a-entity position="0 0 3.8">
                        <a-camera
                            look-controls-enabled="true"
                            keyboard-controls="fpsMode: true"
                            mouse-cursor
                        >
                            <a-cursor fuse="true" color="yellow" />
                        </a-camera>
                    </a-entity>
                    {/* <ContainerScene /> */}
                    <CubeScene />

                    <a-sky src="#sky" rotation="0 -270 0" />
                </Entity>
            </Scene>
        );
    }
}

Enviornment.propTypes = {};

export default Enviornment;
