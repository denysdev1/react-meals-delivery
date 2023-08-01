import { ReactNode, useReducer } from "react";
import CartContext, { CartContextType } from "./CartContext";
import { Meal } from "../types/Meal";

type Props = { children: ReactNode };
type ActionType = {
  type: "ADD" | "REMOVE";
  item?: Meal;
  id?: string;
};

const defaultCartState = {
  items: [] as Meal[],
  totalAmount: 0,
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

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  } else if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems: Meal[];

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== existingCartItem.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
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

  const initialState: CartContextType = {
    ...cartState,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={initialState}>{children}</CartContext.Provider>
  );
};
