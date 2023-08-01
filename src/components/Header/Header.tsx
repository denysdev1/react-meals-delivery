import meals from "../../assets/meals.jpg";
import { HeaderCartButton } from "./HeaderCartButton/HeaderCartButton";
import styles from "./Header.module.css";

export const Header: React.FC = () => (
  <>
    <header className={styles.header}>
      <h1>Meals Delivery</h1>
      <HeaderCartButton />
    </header>
    <div className={styles["main-image"]}>
      <img src={meals} alt="A table full of delicious food" />
    </div>
  </>
);
