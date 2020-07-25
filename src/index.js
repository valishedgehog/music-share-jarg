import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";
import Theme from "./materialStyles/Theme";
import client from "./graphql/client";

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
