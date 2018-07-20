import React from "react";
import { AppRegistry, View, StyleSheet } from "react-native-web";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import SceneBuilder from "./view";
import { colors } from "./styles";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://api.graph.cool/simple/v1/cjjuib45n0cgn0198de0tkjfn`
  }),
  cache: new InMemoryCache()
  // for SSR, use:
  // cache: new Cache().restore(window.__APOLLO_STATE__ || {})
});

const App = () => (
  <ApolloProvider client={client}>
    <View id="root" style={styles.container}>
      <SceneBuilder />
    </View>
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
