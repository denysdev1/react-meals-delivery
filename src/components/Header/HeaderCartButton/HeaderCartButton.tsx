import styles from "./HeaderCartButton.module.css";
import { CartIcon } from "../../CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/CartContext";

type Props = {
  handleClick: () => void;
};

export const HeaderCartButton: React.FC<Props> = ({ handleClick }) => {
  const { items } = useContext(CartContext);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const numberOfItems = items.reduce((prev, curr) => prev + curr.amount, 0);
  
  useEffect(() => {
    if (!items.length) {
      return;
    }

    setIsAnimationActive(true);

    const timerId = setTimeout(() => {
      setIsAnimationActive(false);
    }, 300);

    return () => {
      clearTimeout(timerId);
    }
  }, [items])

  const buttonStyles = `${styles.button} ${isAnimationActive ? styles.bump : ''}`

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfItems}</span>
    </button>
  );
};
