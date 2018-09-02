import React, { Component } from 'react'
import * as aframe from 'aframe'

class SceneContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentScale: 1,
            animateIn: false,
            animateOut: false,
            animationDuration: 1500
        }
    }

    componentDidMount() {
        this.setState({ currentScale: this.props.nextScale })
    }

    componentWillReceiveProps(nextProps) {
        const { nextScale } = nextProps
        const { currentScale, animationDuration } = this.state
        if (nextScale && !this.state.animateIn && !this.state.animateOut) {
            if (nextScale > currentScale) {
                // console.log("Animate in: ", this.props.id)
                this.setState({
                    animateIn: true,
                    currentScale: nextScale
                })
                setTimeout(() => this.setState({
                    animateIn: false,
                }), animationDuration + 1)
            } else if (nextScale < currentScale) {
                // console.log("Animate Out: ", this.props.id)
                this.setState({
                    animateOut: true,
                    currentScale: nextScale
                })
                setTimeout(() => this.setState({
                    animateOut: false,
                }), animationDuration + 1)
            }
        }
    }
    render() {

        const {
            animateIn,
            animateOut,
            currentScale,
            animationDuration
        } = this.state
        const { children, id, nextScale } = this.props

        // console.log("Children from scene container: ", children)
        return (
            <a-entity
                id={`sceneContainer-${id}`}
                // wireframe={true}
                // side="double"
                // metalness="0.76"
                // radius="15"
                className="container"
                scale={`${currentScale} ${currentScale} ${nextScale}`}
                position={`${0} ${0} ${-4}`}
            >
                {animateIn && <a-animation
                    attribute="opacity"
                    dur={`${animationDuration / 2}`}
                    delay={`${animationDuration / 2}`}
                    fill="forwards"
                    from="0"
                    to={`0.8`}
                />}
                {animateIn && <a-animation
                    attribute="scale"
                    dur={`${animationDuration}`}
                    fill="forwards"
                    to={`${nextScale} ${nextScale} ${nextScale}`}
                />}
                {animateOut && <a-animation
                    attribute="opacity"
                    dur={`${animationDuration / 2}`}
                    fill="forwards"
                    from="0.8"
                    to="0"
                />}
                {animateOut && <a-animation
                    attribute="scale"
                    dur={`${animationDuration / 2}`}
                    fill="forwards"
                    to={`${nextScale} ${nextScale} ${nextScale}`}
                />}
                {children}
            </a-entity>
        )
    }
}

export default SceneContainer

