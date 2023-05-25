import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar">
            <img src="//static.sratim.tv/assets/images/logo.png" className="img-fluid" alt="logo" />
            <a href="/" className="nav-link">Search</a>
            <a href="/cart" className="nav-link">Cart</a>
            <a href="/checkout" className="nav-link">Checkout</a>
        </div>
    );
};

export default Navbar;
