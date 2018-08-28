import React, { Component } from "react";
import * as aframe from "aframe";

const AmbientSceneLight = props => {
    return (
        <a-entity id="sceneContainerLight" light="type: ambient; color: violet; intensity: 0.2;"></a-entity>
    )
}

export default AmbientSceneLight