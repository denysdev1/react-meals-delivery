import { createContext } from "react";
import { Meal } from "../types/Meal";

export type CartContextType = {
  items: Meal[],
  totalAmount: number,
  addItem: (item: Meal) => void,
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

export default CartContext;
