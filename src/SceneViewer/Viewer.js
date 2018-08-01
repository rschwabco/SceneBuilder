
import React, { Component } from "react";
import SceneViewer from "./Scene"
import { CubeScene } from "./Scenes"
import Camera from "./Camera"

export default class Viewer extends Component {
    constructor() {
        super();

        this.state = {
            currentScene: "TankerShip",
        };
    }

    _nextScene = (nextScene) => {
        this.setState({ currentScene: nextScene })
    }

    // Sceneviewer gqlQuery prop changes scene contents
    render() {
        const { currentScene } = this.state
        return (
            <SceneViewer
                gqlQuery={currentScene}
                onAssetClick={this._nextScene}
            >
                {this.props.children}
                <Camera
                // rotate={this.state.rotateCamera}
                />
            </SceneViewer>
        );
    }
}
