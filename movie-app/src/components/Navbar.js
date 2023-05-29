// import React, {useState, useEffect} from 'react';
//
// const Navbar = () => {
//     const [cartSize, setCartSize] = useState(0);
//
//     useEffect(() => {
//         fetch('/api/cart')
//             .then((response) => response.json())
//             .then((data) => {
//                 // Assuming the API response returns the cart size as a number
//                 setCartSize(data.length);
//             })
//             .catch((error) => {
//                 console.log('Error fetching cart data:', error);
//             });
//     }, [cartSize]);
//
//     return (
//         <div className="navbar">
//             <img src="//static.sratim.tv/assets/images/logo.png" className="img-fluid" alt="logo"/>
//             <a href="/" className="nav-link">SearchByInput</a>
//             <a href="/cart" className="nav-link">
//                 Cart &nbsp;
//                 {cartSize > 0 && (
//                     <span className="badge rounded-pill badge-notification bg-danger">{cartSize}</span>
//                 )}
//             </a>
//             <a href="/checkout" className="nav-link">Checkout</a>
//         </div>
//     );
// };
//
// export default Navbar;

import React, {useContext, useEffect, useState} from 'react';
import { CartContext } from './Search/CartContext';

const Navbar = () => {
    const { cartSize } = useContext(CartContext);
    const [cart, setCartSize] = useState(0);

        useEffect(() => {
        fetch('/api/cart')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the API response returns the cart size as a number
                setCartSize(data.length);
            })
            .catch((error) => {
                console.log('Error fetching cart data:', error);
            });
    }, []);

    return (
        <div className="navbar">
            <img src="//static.sratim.tv/assets/images/logo.png" className="img-fluid" alt="logo" />
            <a href="/" className="nav-link">Search</a>
            <a href="/cart" className="nav-link">
                Cart &nbsp;
                {cartSize > 0 && (
                    <span className="badge rounded-pill badge-notification bg-danger">{cartSize}</span>
                )}
            </a>
            <a href="/checkout" className="nav-link">Checkout</a>
        </div>
    );
};

export default Navbar;

