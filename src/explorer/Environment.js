import React, { Component } from "react";
import PropTypes from "prop-types";
import { Entity, Scene } from "aframe-react";

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

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    let { pitch, roll, yaw, x, y, z } = this.state;

    return (
      <Scene vr-mode-ui keyboard-shortcuts leap="vr: false">
        <a-assets>
          <a-image id="sky" src="holodeck.png" />
        </a-assets>
        <Entity>
          {this.props.children}

          <a-camera
            camera
            far="6000"
            rotation={`${roll} ${yaw} ${pitch}`}
            zoom={`${Math.abs(this.state.zoom / 1000)}`}
          >
            <a-cursor id="cursor">
              <a-animation
                begin="click"
                easing="ease-in"
                attribute="scale"
                fill="backwards"
                from="0.1 0.1 0.1"
                to="1 1 1"
                dur="150"
              />
              <a-animation
                begin="cursor-hovering"
                easing="ease-in"
                attribute="scale"
                from="1 1 1"
                to="0.1 0.1 0.1"
                dur="1500"
              />
            </a-cursor>
          </a-camera>
          <a-sky src="#sky" rotation="0 -270 0" />
        </Entity>
      </Scene>
    );
  }
}

Enviornment.propTypes = {};

export default Enviornment;
