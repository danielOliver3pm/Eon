import styles from "./Layout.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer className={styles.footer}>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <div className={styles.socialButtonF}>
        <FaFacebookF className={styles.iconF} />
      </div>
    </a>

    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <div className={styles.socialButtonI}>
        <FaInstagram className={styles.iconI} />
      </div>
    </a>

    <a href="http://localhost:3000/about#contact">
      <div className={styles.socialButtonE}>
        <FaEnvelope className={styles.iconE} />
      </div>
    </a>
  </footer>
);

export default Footer;
