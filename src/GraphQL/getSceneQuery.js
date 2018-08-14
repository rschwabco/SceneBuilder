import gql from "graphql-tag";

export const getSceneQuery = (sceneName = "CargoShip-scene") => {
    return gql`query {
        scenes(where: {name_contains: "${sceneName}"}) {
          id
          assets: semanticLayoutNodes {
            physicalModel{
              physicalAsset{
                name
              }
            }
            position {
              x
              y
              z
            }
            scale{
              x
              y
              z
            }
            rotation{
              x
              y
              z
            }
          }
        }
      }`
}

export const getDeepSceneQuery = (sceneName = "CargoShip-scene") => {
    return gql`
    query {
        scenes(where: {name_contains: "${sceneName}"}) {
          id
          containerNode{
            name
            position {
              x
              y
              z
            }
          }
          children {
            id
            containerNode {
              name
              position {
                x
                y
                z
              }
            }
            semanticLayoutNodes {
              ...semanticLayoutData
            }
          }
          parent {
              semanticLayoutNodes {
              ...semanticLayoutData
            }
          }
          semanticLayoutNodes {
              ...semanticLayoutData  
          }
              
        }
      }
      
      fragment semanticLayoutData on SemanticLayoutNode {
            physicalModel{
              physicalAsset{
                name
                objPath
                mtlPath
              }
            }
            position {
              x
              y
              z
            }
            rotation {
              x
              y
              z
            }
            scale {
              x
              y
              z
            }
      }`
}