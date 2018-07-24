import React, { Component } from "react";
import PropTypes from "prop-types";
import * as AFRAME from "aframe";
import * as fff from "aframe-text-geometry-component";
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
          <a-image
            id="sky"
            src="https://uploads.codesandbox.io/uploads/user/cf641f2b-3840-4f83-bf5e-dee7737a7432/EB1V-holodeck.png"
          />

          <a-asset-item
            id="vessel-obj"
            src="https://raw.githubusercontent.com/roieki/SceneBuilder/5e3b9993e5a9af95316a2716f9da92fd9f54863f/public/enterprise/enterprise1701d.obj"
          />
          <a-asset-item
            id="vessel-mtl"
            src="https://raw.githubusercontent.com/roieki/SceneBuilder/master/public/enterprise/enterprise1701d.mtl"
          />

          <a-asset-item
            id="dawningFont"
            src="https://cdn.glitch.com/c719c986-c0c5-48b8-967c-3cd8b8aa17f3%2FdawningOfANewDayRegular.typeface.json?1490305922844"
          />
          <a-asset-item
            id="exoFont"
            src="https://cdn.glitch.com/c719c986-c0c5-48b8-967c-3cd8b8aa17f3%2Fexo2Black.typeface.json?1490305922150"
          />
          <a-asset-item
            id="exoItalicFont"
            src="https://cdn.glitch.com/c719c986-c0c5-48b8-967c-3cd8b8aa17f3%2Fexo2BlackItalic.typeface.json?1490305922725"
          />

          <a-asset-item
            id="optimerBoldFont"
            src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"
          />

          <a-mixin id="cube" geometry="primitive: box" />
          <a-mixin id="cube-hovered" material="color: magenta" />
          <a-mixin id="cube-selected" material="color: cyan" />
          <a-mixin id="red" material="color: red" />
          <a-mixin id="green" material="color: green" />
          <a-mixin id="blue" material="color: blue" />
          <a-mixin id="yellow" material="color: yellow" />
          <a-mixin id="sphere" geometry="primitive: sphere" />
        </a-assets>

        <Entity>
          {this.props.children}

          <a-entity position="0 2.2 4">
            <a-entity camera look-controls wasd-controls>
              <a-entity
                position="0 0 -3"
                geometry="primitive: ring; radiusInner: 0.2; radiusOuter: 0.3;"
                material="color: cyan; shader: flat"
                cursor="maxDistance: 30; fuse: true"
              >
                <a-animation
                  begin="click"
                  easing="ease-in"
                  attribute="scale"
                  fill="forwards"
                  from="0.2 0.2 0.2"
                  to="1 1 1"
                  dur="150"
                />
                <a-animation
                  begin="fusing"
                  easing="ease-in"
                  attribute="scale"
                  fill="backwards"
                  from="1 1 1"
                  to="0.2 0.2 0.2"
                  dur="1500"
                />
              </a-entity>
            </a-entity>
          </a-entity>

          <a-entity position="-3.5 1 0">
            <a-entity mixin="cube red">
              <a-animation
                begin="click"
                attribute="position"
                from="0 0 0"
                to="0 0 -10"
                dur="2000"
                fill="both"
              />
            </a-entity>
          </a-entity>

          <a-entity position="0 1 0">
            <a-entity mixin="cube green">
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
            class="
                                    "
            mixin="cube yellow"
            rotation="0 45 0"
            scale=".5 .5 .5"
          />

          <a-sky src="#sky" rotation="0 -270 0" />
        </Entity>
      </Scene>
    );
  }
}

Enviornment.propTypes = {};

export default Enviornment;
