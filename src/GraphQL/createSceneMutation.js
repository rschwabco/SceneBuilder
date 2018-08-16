
// mutation($name: String!, $containerNode: SemanticLayoutNodeWhereUniqueInput, $children: [SceneCreateWithoutParentInput!]) {
    //     createScene (data: {
        //       name: $name,
        //       containerNode: { connect: $containerNode}
        //       children: { create: $children}
        //     }) { id }
        //   }

// TODO: Turn this into a generator of some sort
// "children": { "create": [{ ... }] },
// const mutation = {
//     "name": "LogisticsOverhaul-act",
//     "containerNode": { "id": "cjkssfz4bw32g0b77a1oz5n2x"},
//     "children": [{
//         "name": "vesselWithParts-2-scene",
//       	"children": { "create": [{
//         "name": "vesselWithParts-2-scene-child-1",
//         "containerNode": {
//           "create": {
//             "position": { "create": {
//               "x": 15,
//               "y": 15,
//               "z": -6
//                 }
//             },
//             "rotation": { "create": {
//               "x": 0,
//               "y": 45,
//               "z": 0 
//             }
//             },
//             "scale": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0
//             }
//         },
//         "physicalModel": { "create": {
//             "name": "vesselWithParts-2-scene-child-1-physicalModel",
//             "physicalAsset": { "create": {
//                 "name": "vesselWithParts-2-scene-child-1-physicalAsset",
//                                 "modelType": "OBJ",
//                 "objPath": "path/to/obj"
//             }}
//         }}
//           }
//         },
//       "semanticLayoutNodes": { "create": [{
//         "name": "vesselWithParts-2-scene-child-1-semanticLayoutNode",
//         "position": { "create": {
//               "x": 1,
//               "y": 1,
//               "z": 0
//                 }
//             },
//             "rotation": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0 
//             }
//             },
//             "scale": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0
//             }
//             },
//         "physicalModel": { "create": {
//           "name": "vesselWithParts-2-scene-child-1-semanticLayoutNode-physicalModel",
//           "physicalAsset": { "create": {
//             "name": "vesselWithParts-2-scene-child-1-semanticLayoutNode-physicalAsset",
//             "modelType": "GEOMETRY",
//             "objPath": "path/to/obj"
//           } }
//         } }
//       }]}
//     }] },
//         "containerNode": {
//           "create": {
//             "position": { "create": {
//               "x": 3,
//               "y": 3,
//               "z": -6
//                 }
//             },
//             "rotation": { "create": {
//               "x": 0,
//               "y": 45,
//               "z": 0 
//             }
//             },
//             "scale": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0
//             }
//         },
//         "physicalModel": { "create": {
//             "name": "vesselWithParts-2-scene-physicalModel",
//             "physicalAsset": { "create": {
//                 "name": "vesselWithParts-2-scene-physicalAsset",
//                                 "modelType": "OBJ",
//                 "objPath": "path/to/obj"
//             }}
//         }}
//           }
//         },
//       "semanticLayoutNodes": { "create": [{
//         "name": "vesselWithParts-2-scene-semanticLayoutNode",
//         "position": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0
//                 }
//             },
//             "rotation": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0 
//             }
//             },
//             "scale": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0
//             }
//             },
//         "physicalModel": { "create": {
//           "name": "vesselWithParts-2-scene-semanticLayoutNode-physicalModel",
//           "physicalAsset": { "create": {
//             "name": "vesselWithParts-2-scene-semanticLayoutNode-physicalAsset",
//             "modelType": "GEOMETRY",
//             "objPath": "path/to/obj"
//           } }
//         } }
//       }]}
//     },
//     {
//         "name": "vesselWithParts-1-scene",
//         "containerNode": {
//           "create": {
//             "position": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0
//                 }
//             },
//             "rotation": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0 
//             }
//             },
//             "scale": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0
//             }
//         },
//         "physicalModel": { "create": {
//             "name": "vesselWithParts-1-scene-physicialModel",
//             "physicalAsset": { "create": {
//                 "name": "vesselWithParts-1-scene-physicalAsset",
//                                 "modelType": "OBJ",
//                 "objPath": "path/to/obj"
//             }}
//         }}
//           }
//         },
//       "semanticLayoutNodes": { "create": [{
//         "name": "vesselWithParts-1-scene-semanticLayoutNode",
//         "position": { "create": {
//               "x": 1,
//               "y": 1,
//               "z": 0
//                 }
//             },
//             "rotation": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0 
//             }
//             },
//             "scale": { "create": {
//               "x": 0,
//               "y": 0,
//               "z": 0
//             }
//             },
//         "physicalModel": { "create": {
//           "name": "vesselWithParts-1-scene-semanticLayoutNode-physicalModel",
//           "physicalAsset": { "create": {
//             "name": "vesselWithParts-1-scene-semanticLayoutNode-physicalAsset",
//             "modelType": "GEOMETRY",
//             "objPath": "path/to/obj"
//           } }
//         } }
//       }]}
//     }]
// }