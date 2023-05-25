import React from 'react';

const CartMovieRow = ({movie, movies, setMovies, index, moviePrice,}) => {
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

    return (
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
    );

};

export default CartMovieRow;