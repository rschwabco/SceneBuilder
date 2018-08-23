import gql from "graphql-tag";

export const getSceneQuery = (sceneId = "cjkn3ca5kgm8a0b77fr3a28q5") => {
    return gql`query {
        scene (where:{id: "${sceneId}"} ) {
          id
          pq {
              text
          }
          children {
            id
            containerNode {
                position{
                  x
                  y
                  z
                }
              }
          }
          parent {
            id
            containerNode {
                position{
                  x
                  y
                  z
                }
              }
          }
          containerNode {
            position {
              x
              y
              z
            }
          }
          semanticLayoutNodes {
              text
              chart
            physicalModel {
                name
              physicalAsset {
                  geometry
                modelType
                name
                objPath
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
          }
        }
      }`
}

export const getRootSceneQuery = (sceneName = "CargoShip-aggregation") => {
    return gql`
    query {
        scenes(where: {name_contains: "${sceneName}"}) {
          id
          pq {
              text
          }
          containerNode{
            position {
              x
              y
              z
            }
          }
          children {
            id
            children {
              id
              children {
                id
                children {
                  id
                  children {
                    id
                    children {
                        id
                        children {
                            id
                          }
                      }
                  }
                }
              }
            }
          }		
        }
      }
    `
}