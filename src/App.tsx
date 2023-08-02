import { Header } from "./components/Header/Header";
import { MealsInfo } from "./components/Meals/MealsInfo";
import { Cart } from "./components/Cart/Cart";
import { useState } from "react";
import { CartProvider } from "./store/CartProvider";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      {isCartOpen && <Cart handleCloseCart={toggleCartVisibility} />}
      <Header handleOpenCart={toggleCartVisibility} />
      <MealsInfo />
    </CartProvider>
  );
};

export default App;
