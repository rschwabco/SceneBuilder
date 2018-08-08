import React from "react"

class Camera extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            rotate: false,
            cameraTo: "0 0 0",
            updateCamera: false,
            rotationDuration: 1500,
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rotate && !this.state.rotate) {
            console.log("Should rotate")
            this.setState({ rotate: true })
            setTimeout(() => this.setState({ rotate: false, rotation: { y: this.state.rotation.y + 180 } }), 600)
        }
        if (nextProps.updateCamera && !this.state.updateCamera) {
            console.log("Should rotate")
            this.setState({
                updateCamera: true, cameraTo: this.props.cameraTo, rotation: {
                    ...this.props.rotationTo
                }
            })
            setTimeout(() => this.setState({ updateCamera: false }), 1600)
        }
    }


    render() {

        const { x, y, z } = this.state.rotation
        console.log("Camera props: ", this.props)
        return (
            <a-entity
                // rotation={`${x} ${y} ${z}`} // Problematic with cameraToHere
                position="0 0 0"
                look-controls-enabled="true"
            // keyboard-controls="fpsMode: true"
            >
                <a-camera
                    position="0 0 0"
                    // mouse-cursor
                    // cursor="rayOrigin:mouse" // Performance killer?
                    id="camera"
                >
                    <a-cursor fuse="false" color="yellow" />
                </a-camera>
                {this.state.rotate && <a-animation
                    attribute="rotation"
                    dur={`${this.state.rotationDuration}`}
                    fill="forwards"
                    to={`0 ${y + 180} 0`}

                />}
                {this.state.updateCamera && <a-animation
                    attribute="position"
                    dur={`${this.state.rotationDuration}`}
                    fill="forwards"
                    to={`${this.props.cameraTo}`}

                />}

            </a-entity>

        )
    }
}

export default Camera