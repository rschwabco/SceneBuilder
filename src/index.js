import React from "react";
import { AppRegistry, View, StyleSheet } from "react-native-web";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import {
    makeRemoteExecutableSchema,
    mergeSchemas,
    introspectSchema
} from "graphql-tools";

import SceneBuilder from "./SceneViewer/Builder";
import SceneViewer from "./SceneViewer/Viewer";


import { colors } from "./styles/styles";

const SceneBuilderEndpoint =
    "https://api.graph.cool/simple/v1/cjjuib45n0cgn0198de0tkjfn/graphql";
const StarFleetEndpoint =
    "https://api.graph.cool/simple/v1/cjjyyt1wg0hqt0118y59fp8rt/graphql";

const sceneBuilderClient = new ApolloClient({
    link: new HttpLink({
        uri: SceneBuilderEndpoint
    }),
    cache: new InMemoryCache()
    // for SSR, use:
    // cache: new Cache().restore(window.__APOLLO_STATE__ || {})
});

const starfleetClient = new ApolloClient({
    link: new HttpLink({
        uri: StarFleetEndpoint
    }),
    cache: new InMemoryCache()
    // for SSR, use:
    // cache: new Cache().restore(window.__APOLLO_STATE__ || {})
});

const App = () => (
    <ApolloProvider client={sceneBuilderClient}>
        <SceneViewer />
    </ApolloProvider>
);

const styles = StyleSheet.create({
    container: {
        height: "100vh",
        backgroundColor: colors.darkBlue
    }
});

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
