const CartMovieRow = ({ movie, index, moviePrice, handleDecreaseWeeks, handleIncreaseWeeks }) => (
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

export default CartMovieRow;