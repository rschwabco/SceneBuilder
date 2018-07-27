import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import { Entity, Scene } from "aframe-react";
class ContainerScene extends Component {
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


            <a-entity click-drag key="1" position="-10 1 0" scale=".2 .2 .2" obj-model="obj: #container-obj;">
                {/* <a-animation
                            begin="click"
                            attribute="rotation"
                            to="0 360 0"
                            easing="linear"
                            dur="2000"
                            fill="backwards"
                        /> */}
            </a-entity>

        );
    }
}

ContainerScene.propTypes = {};

export default ContainerScene;
