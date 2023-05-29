import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartSize, setCartSize] = useState(0);

    const updateCartSize = (newSize) => {
        setCartSize(newSize);
    };

    return (
        <CartContext.Provider value={{ cartSize, updateCartSize }}>
            {children}
        </CartContext.Provider>
    );
};