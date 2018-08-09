import gql from "graphql-tag";

export const getSceneQuery = (sceneName = "CargoShip-Scene") => {
    return gql`query {
        scenes(where: {name_contains: "${sceneName}"}) {
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