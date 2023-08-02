import { useContext, useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import { Meal } from "../../types/Meal";
import { Checkout } from "./Checkout";
import axios from "axios";
import { UserInfo } from "../../types/UserInfo";

type Props = {
  handleCloseCart: () => void;
};

export const Cart: React.FC<Props> = ({ handleCloseCart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const { items, totalAmount, addItem, removeItem, clearCart } = useContext(CartContext);

  const formattedAmount = `$${Math.abs(totalAmount).toFixed(2)}`;
  const itemsAreNotEmpty = items.length !== 0;

  const handleAddItem = (item: Meal) => {
    addItem({ ...item, amount: 1 });
  };

  const handleOrder = () => {
    setIsCheckout(true);
  };

  const handleSubmitOrder = async (userData: UserInfo) => {
    setIsSubmitting(true);
    await axios.post(
      "https://react-meals-delivery-8c291-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        user: userData,
        orderedItems: items,
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    clearCart();
  };

  const modalContent = (
    <>
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
      {!isCheckout && (
        <div className={styles.actions}>
          <button onClick={handleCloseCart}>Close</button>
          {itemsAreNotEmpty && (
            <button className={styles.button} onClick={handleOrder}>
              Order
            </button>
          )}
        </div>
      )}
      {isCheckout && (
        <Checkout
          handleSubmitOrder={handleSubmitOrder}
          handleCancel={handleCloseCart}
        />
      )}
    </>
  );

  return (
    <Modal handleCloseCart={handleCloseCart}>
      {!isSubmitting && !isSubmitted && modalContent}
      {isSubmitting && (
        <>
          <p>Sending order data...</p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={handleCloseCart}>Close</button>
          </div>
        </>
      )}
      {isSubmitted && (
        <>
          <p>Successfully sent the order!</p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={handleCloseCart}>Close</button>
          </div>
        </>
      )}
    </Modal>
  );
};
