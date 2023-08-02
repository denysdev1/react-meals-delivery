import { createContext } from "react";
import { Meal } from "../types/Meal";

export type CartContextType = {
  items: Meal[],
  totalAmount: number,
  addItem: (item: Meal) => void,
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export default CartContext;
