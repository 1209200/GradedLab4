import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToCart = (item) => {
        setCart([...cart, item]);
        setTotalPrice(totalPrice + item.price);
    };

    const clearCart = () => {
        setCart([]);
        setTotalPrice(0);
    };

    return (
        <CartContext.Provider value={{ cart, totalPrice, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
