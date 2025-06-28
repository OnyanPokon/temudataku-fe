import { CartContext } from '@/context';
import { useContext } from 'react';

const useCart = () => useContext(CartContext);

export default useCart;
