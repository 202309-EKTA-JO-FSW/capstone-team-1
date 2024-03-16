import Cart from "../components/cart/Cart";
import UserDetails from "../components/cart/UserDetails";

const CartPage = () => {
  return (
    <div className="flex flex-col items-center w-full p-2 md:p-8">
      <Cart />
      <UserDetails />
    </div>
  );
};

export default CartPage;
