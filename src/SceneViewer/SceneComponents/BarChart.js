import React, { Component } from "react"
import * as aframe from "aframe"
import { sample } from "underscore"
var aframedc = require('a-framedc');

const sources = ["barsdata1", "barsdata2", "barsdata3", "barsdata4"]
class BarChart extends Component {


    componentWillMount() {
        console.log("Barchart props: ", this.props)
        this.setState({ src: this.props.src })
    }

    render() {
        const { chartDims, chart } = this.props
        return (
            <a-entity
                position={`${-chartDims / 2} ${-chartDims / 2} 0`}
                id="bars"
                barchart={`width: ${chartDims} ;height: ${chartDims} ;gridson:true;title: ${chart} ;src:#${this.state.src}`}
            ></a-entity>
        )
    }
}

export default BarChart