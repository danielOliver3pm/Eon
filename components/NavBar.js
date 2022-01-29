import { useState } from "react";
import { useRouter } from "next/router";
import { useShoppingCart } from "../hooks/use-shopping-cart";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import getStripe from "./get-stripe";
import styles from "./Layout.module.css";
import logo from "../public/eon-logo.png";
import { IoMdCart } from "react-icons/io";
import { MdOutlineMenuOpen } from "react-icons/md";
import { MdCloseFullscreen } from "react-icons/md";

const NavBar = () => {
  const [showNav, setNav] = useState(false);
  const toggleNav = () => setNav(!showNav);
  const { cartDetails, cartCount } = useShoppingCart();
  const router = useRouter();

  const redirectToCheckout = async () => {
    // Create Stripe checkout
    const {
      data: { id },
    } = await axios.post("/api/checkout_sessions", {
      items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
        price: id,
        quantity,
      })),
    });

    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" passHref>
          <span className={styles.logo} onClick={toggleNav}>
            <Image
              src={logo}
              className={styles.eonLogo}
              alt="Logo"
              width={60}
              height={30}
            />
          </span>
        </Link>
        <ul
          style={{ display: showNav ? "flex" : null }}
          className={styles.middleLinks}
        >
          <li
            className={
              (router.pathname == "/" ? "active" : "", styles.linkHome)
            }
          >
            <span className={styles.link} onClick={toggleNav}>
              <Link href="/">Home</Link>
            </span>
          </li>
          <li
            className={
              (router.pathname == "/shop" ? "active" : "", styles.linkHome)
            }
          >
            <span className={styles.link} onClick={toggleNav}>
              <Link href="/shop" className={styles.link}>
                Shop
              </Link>
            </span>
          </li>
          <li
            className={
              (router.pathname == "/about" ? "active" : "", styles.linkHome)
            }
          >
            <span className={styles.link} onClick={toggleNav}>
              <Link href="/about" className={styles.link}>
                About
              </Link>
            </span>
          </li>
          <span className={styles.cartItems} onClick={toggleNav}>
            <button
              onClick={redirectToCheckout}
              className={styles.buttonCart}
              name="cartButton"
              aria-label="cartButton"
            >
              <IoMdCart className={styles.Cartlink} size="small" />
            </button>
          </span>
          <span className={styles.cartCount}>{cartCount}</span>
        </ul>
        <button
          type="button"
          onClick={toggleNav}
          className={(styles.btbIcon, styles.nav__hamburger)}
          aria-label="toggle navigation"
        >
          {showNav ? (
            <MdOutlineMenuOpen size="small" />
          ) : (
            <MdCloseFullscreen size="small" />
          )}
        </button>
      </nav>
    </>
  );
};

export default NavBar;
