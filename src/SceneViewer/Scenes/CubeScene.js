import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import { Entity, Scene } from "aframe-react";
import { getAssetsQuery } from "../../GraphQL"
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

            <Entity>
                <a-entity position="-3.5 1 0">
                    <a-entity
                        mixin="cube red"
                        event-set
                        event-set__down="_event: mousedown; material.wireframe: true"
                        event-set__up="_event: mouseup; material.wireframe: false"
                        event-set__leave="_event: mouseleave; material.wireframe: false"
                    />
                    <a-animation
                        begin="click"
                        attribute="rotation"
                        to="0 360 0"
                        easing="linear"
                        dur="2000"
                        fill="backwards"
                    />
                </a-entity>

                <a-entity position="0 1 0">
                    <a-entity click-drag mixin="cube green">
                        <a-animation
                            begin="click"
                            attribute="rotation"
                            to="0 360 0"
                            easing="linear"
                            dur="2000"
                            fill="backwards"
                        />
                    </a-entity>
                </a-entity>

                <a-entity position="3.5 1 0" rotation="0 45 0">
                    <a-entity mixin="cube blue">
                        <a-animation
                            begin="click"
                            fill="forwards"
                            repeat="1"
                            direction="alternate"
                            attribute="position"
                            from="0 0 0"
                            to="15 0 0"
                            dur="2000"
                        />
                    </a-entity>
                </a-entity>

                <a-entity
                    position="0 3 0"
                    class="                                    "
                    mixin="cube yellow"
                    rotation="0 45 0"
                    scale=".5 .5 .5"
                />
            </Entity>

        );
    }
}

ContainerScene.propTypes = {};

export default ContainerScene;
