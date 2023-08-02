import classes from "./CartItem.module.css";

type Props = {
  name: string;
  price: number;
  amount: number;
  handleRemove: () => void;
  handleAdd: () => void;
}

const CartItem: React.FC<Props> = ({ name, price, amount, handleRemove, handleAdd }) => {
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{formattedPrice}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={handleRemove}>−</button>
        <button onClick={handleAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
