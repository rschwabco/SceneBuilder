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
                key={asset.name}
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

            if (gqlAsset.objPath && gqlAsset.objPath.includes("http")) {
                if (gqlAsset.name !== "VHSP-Vessel-1-parts-part1-asset" && gqlAsset.name !== "VHSP-Vessel-1-parts-part3-asset" && gqlAsset.name !== "VHSP-Vessel-2-parts-part1-asset" && gqlAsset.name !== "VHSP-Vessel-2-parts-part2-asset" && gqlAsset.name !== "VHSP-Vessel-2-parts-part3-asset")
                    newAssets.push(makeObjAsset(gqlAsset))
            }
            // if (gqlAsset.mtlPath && gqlAsset.mtlPath.includes("http")) {
            //     newAssets.push(makeMtlAsset(gqlAsset))
            // }
        }
        console.log("registered assets: ", newAssets)
        return newAssets
    }
    return (<a-assets>
        {makeAllAssets()}

        <a-asset-item id="barsdata1" src="https://raw.githubusercontent.com/fran-aguilar/a-framedc/master/examples/data/scm-commits-filtered.json"></a-asset-item>
        <a-asset-item id="barsdata2" src="https://raw.githubusercontent.com/llanginger/SceneBuilder/optimising-asset-loading/mockJson/mock_Json1.json"></a-asset-item>
        <a-asset-item id="barsdata3" src="https://raw.githubusercontent.com/llanginger/SceneBuilder/optimising-asset-loading/mockJson/mock_Json2.json"></a-asset-item>
        <a-asset-item id="barsdata4" src="https://raw.githubusercontent.com/llanginger/SceneBuilder/optimising-asset-loading/mockJson/mock_Json3.json"></a-asset-item>
        <a-asset-item id="barsdata5" src="https://raw.githubusercontent.com/llanginger/SceneBuilder/optimising-asset-loading/mockJson/mock_Json4.json"></a-asset-item>
        <a-asset-item id="barsdata6" src="https://raw.githubusercontent.com/llanginger/SceneBuilder/optimising-asset-loading/mockJson/mock_Json5.json"></a-asset-item>

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