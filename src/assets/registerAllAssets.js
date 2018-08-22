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
            if (gqlAsset.objPath) {
                // console.log("Obj with objPath: ", gqlAsset)
                newAssets.push(makeObjAsset(gqlAsset))
            }
            if (gqlAsset.mtlPath) {
                newAssets.push(makeMtlAsset(gqlAsset))
            }
        }
        // console.log("new assets: ", newAssets)
        return newAssets
    }
    return (<a-assets>
        {makeAllAssets()}
        < a-image
            id="sky"
            src="https://uploads.codesandbox.io/uploads/user/cf641f2b-3840-4f83-bf5e-dee7737a7432/EB1V-holodeck.png"
        />

        <a-asset-item id="barsdata" src="https://raw.githubusercontent.com/fran-aguilar/a-framedc/master/examples/data/scm-commits-filtered.json"></a-asset-item>
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

        <a-image id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />

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