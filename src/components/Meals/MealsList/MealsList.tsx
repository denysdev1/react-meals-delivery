import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../../Card/Card";
import { MealItem } from "../MealItem/MealItem";
import styles from "./MealsList.module.css";
import { Meal } from "../../../types/Meal";

export const MealsList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await axios.get(
          "https://react-meals-delivery-8c291-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );
        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            ...data[key],
          });
        }

        setMeals(loadedMeals);
      } catch {
        setError("Failed to fetch data");
      }
    };

    fetchMeals();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.error}>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};
