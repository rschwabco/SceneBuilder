import gql from "graphql-tag";

export const getSceneQuery = ($sceneIds = ["cjkn3ca5kgm8a0b77fr3a28q5"]) => {
    return gql`query ($sceneIds: [ID!]) {
        scenes (where:{id_in: $sceneIds} ) {
          id
          pq {
              text
          }
          children {
            id
            containerNode {
              position{ x y z }
            }
          }
          parent {
            id
            containerNode {
                position{ x y z }
              }
          }
          containerNode {
            position { x y z }
          }
          semanticLayoutNodes {
            name
            text
            chart
            navigatesTo {
                id
              }
            dimensions { x y z }
            physicalModel {
              id
              name
              physicalAsset {
                geometry
                modelType
                name
                objPath
              }
            }
            position { x y z }
            rotation { x y z }
            scale { x y z }
            childNodes {
              text
              chart
              name
              navigatesTo {
                id
              }
              dimensions { x y z }
              physicalModel {
                id
                name
                physicalAsset {
                  geometry
                  modelType
                  name
                  objPath
                }
              }
              position { x y z }
              rotation { x y z }
              scale { x y z }
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