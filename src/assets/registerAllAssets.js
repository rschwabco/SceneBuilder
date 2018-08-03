// * Register all assets here 

import React, { Component } from "react";
import * as aframe from "aframe";

// shape: 
// {
//     name
//     objPath
//     mtlPath
// }

const registerAllAssets = (assets) => {
    let newAssets = []

    const makeObjAsset = (asset) => {
        return (
            <a-asset-item
                id={`${asset.name}-obj`}
                src={asset.objPath}
            />
        )
    }
    const makeMtlAsset = (asset) => {
        return (
            <a-asset-item
                id={`${asset.name}-mtl`}
                src={asset.mtlPath}
            />
        )

    }

    const makeAllAssets = () => {


        for (let gqlAsset of assets) {
            newAssets.push(makeObjAsset(gqlAsset))
            newAssets.push(makeMtlAsset(gqlAsset))
        }

        return newAssets
    }
    return (<a-assets>
        {makeAllAssets()}
        < a-image
            id="sky"
            src="https://uploads.codesandbox.io/uploads/user/cf641f2b-3840-4f83-bf5e-dee7737a7432/EB1V-holodeck.png"
        />

        <a-asset-item
            id="OilDrum-Wireframe-obj"
            src="https://raw.githubusercontent.com/llanginger/ScenebuilderModels/master/oilDrum/barrel_1_wireframe.obj"
        />

        <a-asset-item
            id="vessel-obj"
            src="https://raw.githubusercontent.com/roieki/SceneBuilder/5e3b9993e5a9af95316a2716f9da92fd9f54863f/public/enterprise/enterprise1701d.obj"
        />
        <a-asset-item
            id="vessel-mtl"
            src="https://raw.githubusercontent.com/roieki/SceneBuilder/master/public/enterprise/enterprise1701d.mtl"
        />


        <a-asset-item
            id="dawningFont"
            src="https://cdn.glitch.com/c719c986-c0c5-48b8-967c-3cd8b8aa17f3%2FdawningOfANewDayRegular.typeface.json?1490305922844"
        />
        <a-asset-item
            id="exoFont"
            src="https://cdn.glitch.com/c719c986-c0c5-48b8-967c-3cd8b8aa17f3%2Fexo2Black.typeface.json?1490305922150"
        />
        <a-asset-item
            id="exoItalicFont"
            src="https://cdn.glitch.com/c719c986-c0c5-48b8-967c-3cd8b8aa17f3%2Fexo2BlackItalic.typeface.json?1490305922725"
        />

        <a-asset-item
            id="optimerBoldFont"
            src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"
        />

        <a-mixin id="cube" geometry="primitive: box" />
        <a-mixin id="cube-hovered" material="color: magenta" />
        <a-mixin id="cube-selected" material="color: cyan" />
        <a-mixin id="red" material="color: red" />
        <a-mixin id="green" material="color: green" />
        <a-mixin id="blue" material="color: blue" />
        <a-mixin id="yellow" material="color: yellow" />
        <a-mixin id="sphere" geometry="primitive: sphere" />
    </a-assets>)
}



export default registerAllAssets