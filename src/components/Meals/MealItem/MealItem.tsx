import { MealItemForm } from "../MealItemForm/MealItemForm";
import styles from "./MealItem.module.css";

type Props = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const MealItem: React.FC<Props> = ({ id, name, description, price }) => {
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <MealItemForm id={id} />
    </li>
  );
};
