import React, { Component } from "react";
import PropTypes from "prop-types";
import * as aframe from "aframe";
import * as fff from "aframe-text-geometry-component";
import * as kkk from "aframe-event-set-component";
import { Entity, Scene } from "aframe-react";
import Camera from "./Camera"
import assets from "../assets/registerAssets"
import { getAssetsQuery } from "../GraphQL/index"
import registerClickDrag from "aframe-click-drag-component";
import { TankerShipScene } from "./Scenes"
import { Query } from "react-apollo";
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native-web";



registerClickDrag(aframe)


class SceneViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedSky: false,
            updatedBy: "",
            rotateCamera: false
        };


    }

    // TODO: This will need to be able to add different animations / behaviors.
    // TODO: This will need to also be able to take multiple different assets, or perhaps this should be called -PER- asset? That sounds better as I type it
    makeEntities = (data) => {

        const { obj, allPositions } = data
        const { name, scale } = obj[0]

        return allPositions.map((position, i) => {
            if (i === 0) {

                return (
                    <a-entity
                        model-opacity="0.5"
                        click-drag
                        model-opacity
                        key={i}
                        click-to-navigate
                        position={`${position.x} ${position.y} ${position.z}`}
                        scale={`${scale} ${scale} ${scale} `}
                        obj-model={`obj: #${name}-obj; mtl: #${name}-mtl;`}
                    >
                        {this.props.assetOpacity === 0.5 && <a-animation
                            attribute="model-opacity"
                            dur="1000"
                            from="1"
                            to="0.5"
                            repeat="0"></a-animation>}
                        {this.props.assetOpacity === 1 && <a-animation
                            attribute="model-opacity"
                            dur="1000"
                            from="0.5"
                            to="1"
                            repeat="0"></a-animation>}
                    </a-entity>
                )
            }
        })
    }


    render() {
        return (
            <Query query={getAssetsQuery(this.props.gqlQuery)}>
                {({ loading, error, data }) => {

                    console.log("Data from Scene: ", data)
                    console.log("gqlQuery: ", this.props.gqlQuery)

                    if (loading) return <ActivityIndicator color={"#fff"} />;
                    if (error) return <Text>{`Error: ${error}`}</Text>;

                    return (
                        <a-entity position={`0 0 ${this.props.rotateScene}`}>
                            <a-entity rotation="0 0 0" >
                                {this.props.gqlQuery === "TankerShip" && <TankerShipScene onAssetClick={this.props.onAssetClick} />}
                                {this.props.gqlQuery !== "TankerShip" && this.makeEntities(data)}
                            </a-entity>
                        </a-entity>
                    )
                }}
            </Query>
        )
    }
}



export default SceneViewer;


