import React, { Component } from "react"
import * as aframe from "aframe"
var aframedc = require('a-framedc');

class BarChart extends Component {

    componentWillMount() {
        const sceneEl = document.querySelector("a-scene")
        const barDataEl = sceneEl.querySelector("#barsdata")
        barDataEl.setAttribute("src", "./todos-1.json")
    }

    render() {
        const { chartDims, chart } = this.props
        return (
            <a-entity
                position={`${-chartDims / 2} ${-chartDims / 2} 0`}
                id="bars"
                barchart={`width: ${chartDims} ;height: ${chartDims} ;gridson:true;title: ${chart} ;src:#barsdata`}
            ></a-entity>
        )
    }
}

export default BarChart