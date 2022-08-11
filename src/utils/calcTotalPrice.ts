import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (cartItems: CartItem[]) => {
	return cartItems.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}