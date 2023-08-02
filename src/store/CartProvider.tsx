import { ReactNode, useReducer } from "react";
import CartContext, { CartContextType } from "./CartContext";
import { Meal } from "../types/Meal";

type Props = { children: ReactNode };
type ActionType = {
  type: "ADD" | "REMOVE" | "CLEAR";
  item?: Meal;
  id?: string;
};

const localStorageMeals = localStorage.getItem("meals");
const localStorageTotalAmount = localStorage.getItem("totalAmount");

const defaultCartState = {
  items: localStorageMeals ? JSON.parse(localStorageMeals) : ([] as Meal[]),
  totalAmount: Number(localStorageTotalAmount) || 0,
};

const cartReducer = (
  state: Pick<CartContextType, "items" | "totalAmount">,
  action: ActionType
) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item!.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount =
      state.totalAmount + action.item!.price * action.item!.amount;
    let updatedItems: Meal[];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item!.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item!);
    }

    localStorage.setItem("meals", JSON.stringify(updatedItems));
    localStorage.setItem("totalAmount", updatedTotalAmount.toString());

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  } else if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems: Meal[];

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(
        (item) => item.id !== existingCartItem.id
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    localStorage.setItem("meals", JSON.stringify(updatedItems));
    localStorage.setItem("totalAmount", updatedTotalAmount.toString());

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  } else if (action.type === "CLEAR") {
    localStorage.removeItem("meals");
    localStorage.removeItem("totalAmount");

    return defaultCartState;
  }

  return state;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCart = (item: Meal) => {
    dispatchCartAction({ type: "ADD", item });
  };
  const removeItemFromCart = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id });
  };
  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const initialState: CartContextType = {
    ...cartState,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={initialState}>{children}</CartContext.Provider>
  );
};
