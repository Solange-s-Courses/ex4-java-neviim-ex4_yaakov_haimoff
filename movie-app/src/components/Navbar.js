import React, {useContext, useEffect} from 'react';
import {CartContext} from './Context/CartContext';

/**
 * A component that renders the navbar - web menu bar
 * It uses the CartContext to display the cart size
 * It fetches the cart size from the API
 * and updates the cart size in the CartContext
 * @returns {JSX.Element}
 */
const Navbar = () => {
    const {cartSize, updateCartSize} = useContext(CartContext);

    /**
     * Fetch the cart size from the API and update the cart size in the CartContext
     * @returns {Promise<void>}
     */
    useEffect(() => {
        fetch('/api/cart')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the API response returns the cart size as a number
                updateCartSize(data.length);
            })
            .catch((error) => {
                console.log('Error fetching cart data:', error);
            });
    }, []);

    return (
        <div className="navbar">
            <img src="//static.sratim.tv/assets/images/logo.png" className="img-fluid" alt="logo"/>
            <a href="/" className="nav-link">Search</a>
            <a href="/cart" className="nav-link">
                Cart &nbsp;
                {cartSize > 0 && (
                    <span className="badge rounded-pill badge-notification bg-danger">{cartSize}</span>
                )}
            </a>
        </div>
    );
};

export default Navbar;

