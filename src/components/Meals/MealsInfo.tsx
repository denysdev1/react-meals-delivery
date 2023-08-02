import { MealsList } from "./MealsList/MealsList";
import { MealsSummary } from "./MealsSummary/MealsSummary";

export const MealsInfo: React.FC = () => {
  return (
    <>
      <MealsSummary />
      <MealsList />
    </>
  );
};
