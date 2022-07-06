import Head from "next/head";
import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>/ t h i s o r t h a t /</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <div className="px-8 py-6 max-w-7xl mx-auto md:py-8">{children}</div>
    </>
  );
}

export default Layout;
