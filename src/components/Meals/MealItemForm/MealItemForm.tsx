import styles from "./MealItemForm.module.css";

type Props = { id: string };

export const MealItemForm: React.FC<Props> = ({ id }) => {
  return (
    <form className={styles.form}>
      <div className={styles.input}>
        <label htmlFor={id}>Amount</label>
        <input id={id} type="number" min="1" defaultValue="1" />
      </div>
      <button>Add</button>
    </form>
  );
};
