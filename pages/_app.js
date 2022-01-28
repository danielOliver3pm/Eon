import "../styles/globals.css";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { CartProvider } from "/hooks/use-shopping-cart";
import "react-image-lightbox/style.css";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <DefaultSeo
          openGraph={{
            type: "candle website, crystal and nature, healing energy, spiritual, positive  and harmony",
            locale: "en_IE",
            url: "https://www.eoncandles.co.nz",
            site_name: "Eon",
          }}
        />
        <title>Eon Candles</title>
        <meta
          name="description"
          content="New Zealand hand crafted candles with crystal and natural energy, promoting peaceful and spiritual auras"
        ></meta>
        <meta property="og:title" content="Eon" />
        <meta
          property="og:description"
          content="Visit Eon to purchase vegan soy handcrafted candles, special candles, featuring crystals and nature for healing and peace, promoting positive vibes!"
        />
        <meta property="og:url" content="https://www.eoncandles.co.nz" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
          key="viewport"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;400&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://eoncandles.co.nz" key="canonical" />
        <link
          rel="canonical"
          href="hhttps://eoncandles.co.nz/shop"
          key="canonical"
        />
        <link
          rel="canonical"
          href="hhttps://eoncandles.co.nz/about"
          key="canonical"
        />
        <link
          rel="canonical"
          href="hhttps://eoncandles.co.nz/shop/love"
          key="canonical"
        />
        <link
          rel="canonical"
          href="hhttps://eoncandles.co.nz/shop/dreams"
          key="canonical"
        />
        <link
          rel="canonical"
          href="hhttps://eoncandles.co.nz/shop/happiness"
          key="canonical"
        />
        <link
          rel="canonical"
          href="hhttps://eoncandles.co.nz/shop/summer"
          key="canonical"
        />
      </Head>

      <CartProvider>
        <NavBar />
        <html lang="en">
          <body styles={{ maxWidth: "100%", width: "100vw", height: "100vh" }}>
            <Component {...pageProps} />
            <Footer />
          </body>
        </html>
      </CartProvider>
    </>
  );
}

export default MyApp;
