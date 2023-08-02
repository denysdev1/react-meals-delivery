import styles from "./MealItemForm.module.css";

type Props = {
  id: string;
  formIsValid: boolean;
  handleAddItem: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MealItemForm: React.FC<Props> = ({
  id,
  formIsValid,
  handleAddItem,
  handleChangeAmount,
}) => {
  return (
    <form className={styles.form}>
      <div className={styles.input}>
        <label htmlFor={id}>Amount</label>
        <input
          id={id}
          type="number"
          min="1"
          max="5"
          defaultValue="1"
          onChange={handleChangeAmount}
        />
      </div>
      <button onClick={handleAddItem}>Add</button>
      {!formIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};
