import React, { useEffect, useState } from 'react';

const CartPage = () => {
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
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Movie Name</th>
                    <th>Weeks</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(movies) && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{movie.name.replace(/"/g, '')}</td>
                            <td className="quantity-cell">
                                <button
                                    type="button"
                                    className="btn btn-light quantity-button"
                                    onClick={() => handleDecreaseWeeks(index)}
                                >
                                    -
                                </button>
                                <span className="quantity">{movie.count}</span>
                                <button
                                    type="button"
                                    className="btn btn-light quantity-button"
                                    onClick={() => handleIncreaseWeeks(index)}
                                >
                                    +
                                </button>
                            </td>
                            <td>{moviePrice.toString() + '$'}</td>
                            <td>{(movie.count * moviePrice).toString() + '$'}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No movies in the cart.</td>
                    </tr>
                )}
                </tbody>
                {movies.length > 0 && (
                    <tfoot>
                    <tr>
                        <td colSpan="4" className="text-right">
                            Total:
                        </td>
                        <td>{calculateTotal()}</td>
                    </tr>
                    </tfoot>
                )}
            </table>
            <button className="btn btn-light" style={{ fontWeight: 'bold' }}>
                Checkout
            </button>
        </div>
    );
};

export default CartPage;
