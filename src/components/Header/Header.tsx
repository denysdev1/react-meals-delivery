import meals from "../../assets/meals.jpg";
import { HeaderCartButton } from "./HeaderCartButton/HeaderCartButton";
import styles from "./Header.module.css";

type Props = {
  handleOpenCart: () => void;
};

export const Header: React.FC<Props> = ({ handleOpenCart }) => (
  <>
    <header className={styles.header}>
      <h1>Meals Delivery</h1>
      <HeaderCartButton handleClick={handleOpenCart} />
    </header>
    <div className={styles["main-image"]}>
      <img src={meals} alt="A table full of delicious food" />
    </div>
  </>
);
