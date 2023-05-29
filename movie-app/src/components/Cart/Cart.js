import React, {useEffect, useState} from 'react';

import CartTable from "./CartTable";

/**
 * Cart component
 * Fetches the cart data from the API and renders the cart table
 * with the movies and total price

 * @returns {JSX.Element}
 */
const Cart = () => {
    const [movies, setMovies] = useState([]);
    const moviePrice = 3.99;

    useEffect(() => {
        fetch('/api/cart')
            .then((response) => response.json())
            .then((data) => {
                const moviesWithCount = data.map((movie) => {
                    const parsedMovie = JSON.parse(movie);
                    return {
                        posterPath: parsedMovie.poster_path,
                        title: parsedMovie.title,
                        releaseDate: parsedMovie.release_date,
                        price: parsedMovie.price,
                        count: 1, // Initialize count to 1 for each movie
                    };
                });
                setMovies(moviesWithCount);
            })
            .catch((error) => {
                console.log('Error fetching cart data:', error);
            });
    }, []);

    /**
     * Handle the checkout button click
     * Construct the checkout URL with the movies and total as parameters
     * and navigate to the checkout page
     * @returns {void}
     */
    const handleSubmit = () => {
        // Construct the checkout URL with the movies and total as parameters
        // and navigate to the checkout page
        window.location.href = `/checkout?total=${calculateTotal().replace('$', '')}`;
    };

    /**
     * Calculate the total price of the movies in the cart
     *
     * @returns {string} the price with the $ sign
     */
    const calculateTotal = () => {
        let total = 0;
        movies.forEach((movie) => {
            total += movie.count * moviePrice;
        });
        return total.toFixed(2) + '$';
    };

    return (
        <div className="card border-grey mb-3">
            <CartTable
                movies={movies}
                setMovies={setMovies}
                calculateTotal={calculateTotal}
            />
            <button className="btn btn-light" style={{fontWeight: 'bold'}}
                    onClick={handleSubmit}>
                Checkout
            </button>
            {/*<a href="/checkout" className="btn btn-light" onClick={handleSubmit}>Checkout</a>*/}
        </div>
    );
};

export default Cart;