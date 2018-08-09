import gql from "graphql-tag";

const getAssetsQuery = (assetName) => {
    return gql`
    query {
        positions {
        x
        y
        z
      }
      obj: physicalAssets(where:{name_contains:"${assetName}"}){
        name
        objPath
      }
      mtl: physicalAssets(where:{name_contains:"${assetName}"}){
        name
        mtlPath
    }
    }
`}

export const getAllAssetsQuery = () => {
    return gql`
    query {
        physicalAssets {
        name
        objPath
        mtlPath
      }
    }
    `
}

export default getAssetsQuery