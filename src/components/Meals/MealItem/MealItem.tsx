import { useContext, useRef, useState } from "react";
import { MealItemForm } from "../MealItemForm/MealItemForm";
import styles from "./MealItem.module.css";
import CartContext from "../../../store/CartContext";

type Props = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const MealItem: React.FC<Props> = ({ id, name, description, price }) => {
  const amount = useRef(1);
  const [formIsValid, setFormIsValid] = useState(true);
  const cartContext = useContext(CartContext);
  const formattedPrice = `$${price.toFixed(2)}`;

  const handleAddItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (amount.current <= 0 || amount.current > 5) {
      setFormIsValid(false);
      return;
    }

    setFormIsValid(true);
    cartContext.addItem({
      id,
      name,
      description,
      price,
      amount: amount.current,
    });
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    amount.current = +event.target.value;
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <MealItemForm
        id={id}
        handleAddItem={handleAddItem}
        handleChangeAmount={handleChangeAmount}
        formIsValid={formIsValid}
      />
    </li>
  );
};
