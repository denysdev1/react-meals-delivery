import styles from "./HeaderCartButton.module.css";
import { CartIcon } from "../../CartIcon";

export const HeaderCartButton: React.FC = () => (
  <button className={styles.button}>
    <span className={styles.icon}>
      <CartIcon />
    </span>
    <span>Your cart</span>
    <span className={styles.badge}>3</span>
  </button>
);
