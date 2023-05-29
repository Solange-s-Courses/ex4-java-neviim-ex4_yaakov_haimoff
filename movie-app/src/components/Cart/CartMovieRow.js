import React from 'react';

/**
 * A component that renders a row in the cart table
 * @param movie - the movie object
 * @param movies - the movies array
 * @param setMovies - the movies array setter
 * @param index - the index of the movie in the movies array
 * @returns {JSX.Element}
 */
const CartMovieRow = ({ movie, movies, setMovies, index }) => {

    /**
     * A function that increases the number of weeks
     * @param index - the index of the movie in the movies array
     * @returns {void}
     */
    const handleIncreaseWeeks = (index) => {
        const updatedMovies = [...movies];
        updatedMovies[index].count++;
        setMovies(updatedMovies);
    };

    /**
     * A function that decreases the number of weeks
     * @param index - the index of the movie in the movies array
     * @returns {void}
     */
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
            <td>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
                    alt={movie.title}
                    style={{ width: '50px' }}
                />
            </td>
            <td>{movie.title}</td>
            <td>{movie.releaseDate}</td>
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
            <td>{movie.price}$</td>
            <td>{(movie.count * movie.price).toString() + '$'}</td>
        </tr>
    );
};

export default CartMovieRow;