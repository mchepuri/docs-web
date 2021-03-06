import PrimarySearchAppBar from "../app/components/Hdr";
import { UserRegistrationContextProvider } from "../app/context/UserRegistrationContext";
import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import theme from "../utils/theme";

const cache = createCache({ key: "css" });
cache.compat = true;

export default function App(props) {
  const { Component, pageProps } = props;
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Listing Upload Tool</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <UserRegistrationContextProvider initialState={{}}>
        <PrimarySearchAppBar />
        <Component {...pageProps} />
      </UserRegistrationContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
