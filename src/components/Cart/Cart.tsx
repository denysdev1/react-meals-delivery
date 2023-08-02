import { useContext } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import { Meal } from "../../types/Meal";

type Props = {
  handleCloseCart: () => void;
};

export const Cart: React.FC<Props> = ({ handleCloseCart }) => {
  const { items, totalAmount, addItem, removeItem } = useContext(CartContext);
  console.log(totalAmount);
  
  const formattedAmount = `$${Math.abs(totalAmount).toFixed(2)}`;
  const itemsAreNotEmpty = items.length !== 0;
  
  const handleAddItem = (item: Meal) => {
    addItem({ ...item, amount: 1 });
  };

  return (
    <Modal handleCloseCart={handleCloseCart}>
      <ul className={styles["cart-items"]}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            handleAdd={() => handleAddItem(item)}
            handleRemove={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{formattedAmount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={handleCloseCart}>Close</button>
        {itemsAreNotEmpty && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};
