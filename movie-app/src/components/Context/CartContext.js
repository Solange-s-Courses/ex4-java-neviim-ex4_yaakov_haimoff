import React, { createContext, useState } from 'react';

export const CartContext = createContext();

/**
 * A component that renders some children wrapped
 * in a CartContext.Provider so they can access the cart context
 * @param children
 * @returns {JSX.Element}
 */
export const CartProvider = ({ children }) => {
    const [cartSize, setCartSize] = useState(0);

    /**
     * A function that updates the cart size
     * @param newSize - the new cart size
     * @returns {void}
     */
    const updateCartSize = (newSize) => {
        setCartSize(newSize);
    };

    return (
        <CartContext.Provider value={{ cartSize, updateCartSize }}>
            {children}
        </CartContext.Provider>
    );
};