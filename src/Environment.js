import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import registerClickDrag from "aframe-click-drag-component";
import { ContainerScene, CubeScene } from "./explorer/Scene"
import assets from "./aFrameAssets/aFrameAssets"
import Camera from "./explorer/Camera"
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
                    <Camera />

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
