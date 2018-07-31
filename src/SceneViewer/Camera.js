import React from "react"

class Camera extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            rotate: false,
            rotationDuration: 500,
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
    }


    render() {

        const { x, y, z } = this.state.rotation
        console.log("Camera props: ", this.props)
        return (
            <a-entity
                camera
                // rotation={`${x} ${y} ${z}`}
                position="0 0 3.8"
            >
                <a-camera
                    look-controls-enabled="true"
                    keyboard-controls="fpsMode: true"
                    mouse-cursor
                >
                    <a-cursor fuse="false" color="yellow" />
                </a-camera>
                {this.state.rotate && <a-animation
                    attribute="rotation"
                    dur={`${this.state.rotationDuration}`}
                    fill="forwards"
                    to={`0 ${y + 180} 0`}

                />}
            </a-entity>
        )
    }
}

export default Camera