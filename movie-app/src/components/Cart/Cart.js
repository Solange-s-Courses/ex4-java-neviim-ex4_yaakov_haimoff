import React, { useState, useEffect } from 'react';

import CartTable from "./CartTable";

const Cart = () => {
    const [movies, setMovies] = useState([]);
    const moviePrice = 3.99;

    useEffect(() => {
        fetch('/api/cart')
            .then((response) => response.json())
            .then((data) => {
                const moviesWithCount = data.map((movie) => ({
                    name: movie,
                    count: 1, // Initialize count to 1 for each movie
                }));
                setMovies(moviesWithCount);
            })
            .catch((error) => {
                console.log('Error fetching cart data:', error);
            });
    }, []);

    const handleIncreaseWeeks = (index) => {
        const updatedMovies = [...movies];
        updatedMovies[index].count++;
        setMovies(updatedMovies);
    };

    const handleDecreaseWeeks = (index) => {
        const updatedMovies = [...movies];
        if (updatedMovies[index].count > 0) {
            updatedMovies[index].count--;
        }
        setMovies(updatedMovies);
    };

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
                moviePrice={moviePrice}
                handleDecreaseWeeks={handleDecreaseWeeks}
                handleIncreaseWeeks={handleIncreaseWeeks}
                calculateTotal={calculateTotal}
            />
            <button className="btn btn-light" style={{ fontWeight: 'bold' }}>
                Checkout
            </button>
        </div>
    );
};

export default Cart;