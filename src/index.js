import React from "react";
import { AppRegistry, View, StyleSheet } from "react-native-web";
import "aframe"
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import {
    makeRemoteExecutableSchema,
    mergeSchemas,
    introspectSchema
} from "graphql-tools";

import Viewer from "./SceneViewer/Viewer";


import { colors } from "./styles/styles";



const SceneBuilderEndpoint =
    "https://us1.prisma.sh/roie-schwaber-cohen-c0f7d8/scenebuilder/dev";

const sceneBuilderClient = new ApolloClient({
    link: new HttpLink({
        uri: SceneBuilderEndpoint
    }),
    cache: new InMemoryCache()
    // for SSR, use:
    // cache: new Cache().restore(window.__APOLLO_STATE__ || {})
});



const App = () => (
    <ApolloProvider client={sceneBuilderClient}>
        <Viewer />
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
