import React, {useState, useEffect} from 'react';

import CartTable from "./CartTable";

const Cart = () => {
    const [movies, setMovies] = useState([]);

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

    return (
        <div className="card border-grey mb-3">
            <CartTable
                movies={movies}
                setMovies={setMovies}
            />
            <button className="btn btn-light" style={{fontWeight: 'bold'}}>
                Checkout
            </button>
        </div>
    );
};

export default Cart;