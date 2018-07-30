//  TODO: Most of this is redundant

import React, { Component } from "react";
import SceneViewer from "./Scene"

export default class Viewer extends Component {
    constructor() {
        super();

        this.state = {
            selectedScene: false
        };
    }

    // Sceneviewer gqlQuery prop changes scene contents
    render() {
        return (
            <SceneViewer gqlQuery="OilDrum">
                {this.props.children}
            </SceneViewer>
        );
    }
}
