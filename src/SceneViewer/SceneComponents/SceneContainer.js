import React, { Component } from 'react'
import * as aframe from 'aframe'

class SceneContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentScale: 1,
            animateScale: false,
            animationDuration: 500
        }
    }

    componentDidMount() {
        this.setState({ currentScale: this.props.nextScale })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nextScale && !this.state.animateScale) {
            this.setState({ animateScale: true, currentScale: nextProps.nextScale })
            setTimeout(() => this.setState({
                animateScale: false
            }), this.state.animationDuration + 1)
        }
    }
    render() {

        const { animateScale } = this.state
        const { children, id, nextScale } = this.props
        return (
            <a-sphere
                fog={false} // Setting ignored for some reason
                id={id}
                // wireframe={true}
                color="orange"
                opacity="0.8"
                side="double"
                metalness="0.76"
                radius="15"
                className="container"
                scale={`${nextScale} ${nextScale} ${nextScale}`}
                position={`${0} ${0} ${-4}`}
            >
                {animateScale && <a-animation
                    attribute="scale"
                    dur={`${this.state.animationDuration}`}
                    fill="forwards"
                    to={`${nextScale} ${nextScale} ${nextScale}`}
                />}

                {children}
            </a-sphere>
        )
    }
}

export default SceneContainer