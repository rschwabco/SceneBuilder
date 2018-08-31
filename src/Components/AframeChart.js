// import React, { Component } from "react";
// import * as aframe from 'aframe'
// import { ApolloClient } from "apollo-client";
// import { HttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { ApolloProvider } from "react-apollo";
// import { Query } from 'react-apollo'
// import {
//     ActivityIndicator,
//     Text,
// } from 'react-native-web'
// import gql from "graphql-tag";

// var fs = require('fs');

// const jsonData = require("./dummyData.json")





// const sensorQuery = gql`query {
//     sensorReadings (part: {id: "HITHER"}) {
//       part {
//         name
//       }
//       value
//     }
//   }`
// const sensorQueryClient = new ApolloClient({
//     link: new HttpLink({
//         uri: "https://maana-sensors.herokuapp.com/"
//     }),
//     cache: new InMemoryCache()
// })

// class AframeChartRenderer extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {}
//     }


//     render() {
//         return null
//     }


// }




// class AframeChart extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {}
//     }

//     componentWillMount() {

//         // * UNCOMMENT THIS TO SEE A CHART!
//         // const sceneEl = document.querySelector("a-scene")
//         // const barDataEl = sceneEl.querySelector("#barsdata")
//         // barDataEl.setAttribute("src", "https://raw.githubusercontent.com/fran-aguilar/a-framedc/master/examples/data/scm-commits-filtered.json")


//     }

//     render() {
//         return (
//             <ApolloProvider client={sensorQueryClient}>
//                 <Query query={sensorQuery} >
//                     {({ loading, error, data }) => {
//                         if (loading) return <ActivityIndicator color={'#fff'} />
//                         if (error) return <Text>{`Error: ${error}`}</Text>

//                         const formattedData = data.sensorReadings.map(point => {
//                             const { value, part } = point
//                             const { name } = part
//                             return { name, value }
//                         })
//                         // console.log("......... AFRAME CHART .........")
//                         // console.log("Data: ", JSON.stringify(formattedData))
//                         // console.log("......... ............ .........")
//                         return (
//                             <a-entity>
//                                 {/* <a-entity position="0 0 -20" id="bars" barchart="width:14;gridson:true;title:example barchart;src:#barsdata"></a-entity> */}
//                             </a-entity>
//                         )
//                     }}
//                 </Query>

//             </ApolloProvider>
//         )
//     }
// }

// export default AframeChart