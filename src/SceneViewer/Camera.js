import React from "react"

class Camera extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            rotate: false,
            cameraTo: "0 0 0",
            moveCamera: false,
            animationDuration: 1500,
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    }

    componentDidMount() {
        this.setState({ animationDuration: this.props.cameraAnimationDuration })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rotate && !this.state.rotate) {
            // console.log("Should rotate")
            this.setState({ rotate: true })
            setTimeout(() => this.setState({ rotate: false, rotation: { y: this.state.rotation.y + 180 } }), 600)
        }
        if (nextProps.moveCamera && !this.state.moveCamera && nextProps.cameraTo !== this.props.cameraTo) {
            // console.log("Should rotate")
            this.setState({
                moveCamera: true, cameraTo: this.props.cameraTo, rotation: {
                    ...this.props.rotationTo
                }
            })
            setTimeout(() => this.setState({
                moveCamera: false
            }), this.state.animationDuration + 1)
        }

        // TODO: Make this block work. Needs to receive the rotation of the camera before removing look-at aframe component
        // if (nextProps.rotationTo && nextProps.rotationTo != this.state.rotation && !this.state.rotate) {
        //     console.log("Next props rotation: ", nextProps)
        //     this.setState({ rotation: { ...nextProps.rotationTo }, rotate: true }, () => console.log("State after rotation: ", this.state))
        //     setTimeout(() => this.setState({ rotate: false }), 100)
        // }
    }


    render() {
        console.log("camera move to: ", this.props.cameraTo)
        const { x, y, z } = this.state.rotation
        return (
            <a-entity
                // rotation={`${x} ${y} ${z}`} // Problematic with cameraToHere
                position="0 4 5"
                look-controls-enabled="true"
            >
                <a-camera
                    position="0 0 0"
                    id="camera"
                >
                    <a-entity
                        position="0 -4 -1"
                        id="cameraLookAt"
                    ></a-entity>
                    {/* <a-cursor fuse="false" color="yellow" /> */}
                </a-camera>
                {this.state.rotate && <a-animation
                    attribute="rotation"
                    dur={`${this.state.animationDuration}`}
                    fill="forwards"
                    to={`0 ${y + 180} 0`}

                />}
                {/* {this.state.rotate && <a-animation
                    attribute="rotation"
                    dur={`0`}
                    fill="forwards"
                    to={`${x} ${y} ${z}`}

                />} */}
                {this.state.moveCamera && <a-animation
                    attribute="position"
                    dur={`${this.state.animationDuration}`}
                    fill="forwards"
                    to={`${this.props.cameraTo}`}

                />}

            </a-entity>

        )
    }
}

export default Camera