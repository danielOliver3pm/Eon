import React, { useState } from "react";
import { useShoppingCart } from "../../hooks/use-shopping-cart";
import axios from "axios";
import getStripe from "../../components/get-stripe";
import Lightbox from "react-image-lightbox";
import { ProductJsonLd } from "next-seo";
import Image from "next/image";
import Layout from "../../components/Layout";
import { products } from "../../components/products";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "../../styles/Candles.module.css";
import altPicFlower from "../../public/Flower-Happy2.png";
import altPicCrystal from "../../public/Crystal-Happy.png";
import altPicLit from "../../public/lit-happy.png";
import mainPic from "../../public/lid-happiness.png";

const Happiness = () => {
  const images = [
    "/lid-happiness.png",
    "/Flower-Happy2.png",
    "/Crystal-Happy.png",
    "/lit-happy.png",
  ];
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [crystal, setCrystal] = useState(false);
  const [flower, setFlower] = useState(false);
  const { addItem, cartDetails } = useShoppingCart();
  const [qty, setQty] = useState(1);
  const [cartClicked, setCartClicked] = useState(false);

  const handleOnAddToCart = async () => {
    if (!cartClicked) {
      addItem(products[1], qty);
      setCartClicked(true);
    }

    if (cartClicked) {
      const {
        data: { id },
      } = await axios.post("../api/checkout_sessions", {
        items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
          price: id,
          quantity,
        })),
      });

      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: id });
    }
  };
  const open = () => {
    setIsOpen(true);
  };

  <ProductJsonLd
    productName="happiness candle"
    description="all the good in life with the beautiful scents of wild orange, clary sage, and lemon. This candle comes paired with citrine chips that channel happiness, and jasmine flower petals for clarity and perspective."
    manufacturerName="Eon"
    material="candle"
    award="best scented candle in NZ"
    aggregateRating={{
      ratingValue: "4.8",
      reviewCount: "166",
    }}
  />;

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.galleryContainer}>
          <div className={styles.galleryImage}>
            <button className={styles.buttonImage} type="button" onClick={open}>
              <Image
                src={altPicFlower}
                alt="happy flower"
                className={styles.candleSize}
                responsive="true"
                priority
              />
            </button>
          </div>
          <div className={styles.galleryImage}>
            <button className={styles.buttonImage} type="button" onClick={open}>
              <Image
                src={altPicLit}
                alt="happy lit"
                className={styles.candleSize}
                responsive="true"
                priority
              />
            </button>
          </div>
          <h1 style={{ display: "none" }}>Crystal Candle Happiness</h1>
          <div className={styles.galleryImage}>
            <button className={styles.buttonImage} type="button" onClick={open}>
              <Image
                src={altPicCrystal}
                alt="happy crystal"
                className={styles.candleSize}
                responsive="true"
                priority
              />
            </button>
          </div>
        </div>
        <div className={styles.galleryMainContainer}>
          <div className={styles.mainImage}>
            <button className={styles.buttonImage} type="button" onClick={open}>
              <Image
                src={mainPic}
                alt="happy main"
                className={styles.candleSizeMain}
                responsive="true"
                priority
              />
            </button>
          </div>
        </div>
        <div className={styles.candleContent}>
          <div className={styles.candleContentHeader}>
            <h2 className={styles.candleTitle}>happiness</h2>
            <p className={styles.candleDescription}>
              Fill the room with positive energies and appreciation for all the
              good in life with the beautiful scents of wild orange, clary sage,
              and lemon. This candle comes paired with citrine chips that
              channel happiness, and jasmine flower petals for clarity and
              perspective.
            </p>
            <div className={styles.containerBits}>
              <h3
                className={styles.containerBitsHeader}
                onMouseEnter={(e) => {
                  setCrystal(true);
                }}
              >
                <span className={styles.headerUnderline}>Citrine</span>
              </h3>
              <h3
                className={styles.containerBitsHeader}
                onMouseEnter={(e) => {
                  setFlower(true);
                }}
              >
                <span className={styles.headerUnderline}>
                  Jasmine Flower Petals
                </span>
              </h3>
              {crystal && (
                <p
                  className={styles.bitsText}
                  onMouseLeave={(e) => {
                    setCrystal(false);
                  }}
                >
                  Citrine enables prosperity, joy, and energy. This powerful
                  crystal provides creative and intuitive energy that may
                  overcome fears. Use this crystal to channel joy into your home
                  and life.
                </p>
              )}
              {flower && (
                <p
                  className={styles.bitsText}
                  onMouseLeave={(e) => {
                    setFlower(false);
                  }}
                >
                  These petals represent clarity and appreciation. We can all
                  use a reminder now and then of the good that we give and
                  receive; use the energy of jasmine petals to gain a new
                  perspective and understanding of how wonderful life can be.
                </p>
              )}
            </div>
            <div className={styles.containerBuy}>
              <p className={styles.candleRetail}>
                $25<sup className={styles.candlePrice}>$30</sup>
              </p>
              <p className={styles.quantity}>Quantity:</p>
              <button
                className={styles.candleQuantity}
                onClick={() => setQty(qty - 1)}
                disabled={qty <= 1}
                aria-label="decrease quantity by one"
              >
                <AiOutlineMinus />
              </button>
              <p>{qty}</p>
              <button
                className={styles.candleQuantity}
                onClick={() => setQty(qty + 1)}
                aria-label="increase quantity by one"
              >
                <AiOutlinePlus />
              </button>
              <p className={styles.continueStripe}>
                {cartClicked
                  ? "Continue to Stripe to complete your order:"
                  : null}
                <button
                  className={styles.submitButton}
                  onClick={handleOnAddToCart}
                  type="button"
                >
                  {!cartClicked ? "ADD TO CART" : "CHECKOUT"}
                </button>
              </p>
            </div>
          </div>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[photoIndex + 1]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setPhotoIndex(0)}
            onMoveNextRequest={() => setPhotoIndex(photoIndex + 1)}
          />
        )}
      </main>
    </Layout>
  );
};

export default Happiness;
