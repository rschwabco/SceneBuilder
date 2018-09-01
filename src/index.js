import React from "react";
import { AppRegistry } from "react-native-web";
import "aframe"
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import Viewer from "./SceneViewer/Viewer";


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


AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
