import { useCallback, useEffect, useState } from 'react';
import CartService from '@/services/CartService';
import PropTypes from 'prop-types';
import { useAuth, useService } from '@/hooks';
import { CartContext } from '@/context';

export default function CartProvider({ children }) {
  const { token } = useAuth();
  const { execute, ...getAllCart } = useService(CartService.getAll);
  const [cart, setCart] = useState({});

  const fetchCart = useCallback(async () => {
    if (!token) return;
    const result = await execute({ token });
    if (result?.data) {
      setCart(result.data);
    }
  }, [execute, token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return <CartContext.Provider value={{ cart, fetchCart, isLoading: getAllCart.isLoading }}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};
