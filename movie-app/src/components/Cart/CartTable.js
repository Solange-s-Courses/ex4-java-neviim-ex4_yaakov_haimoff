import CartMovieRow from './CartMovieRow'

const CartTable = ({
                       movies,
                       moviePrice,
                       handleDecreaseWeeks,
                       handleIncreaseWeeks,
                       calculateTotal
                   }) => (
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
                <CartMovieRow
                    key={index}
                    movie={movie}
                    index={index}
                    moviePrice={moviePrice}
                    handleDecreaseWeeks={handleDecreaseWeeks}
                    handleIncreaseWeeks={handleIncreaseWeeks}
                />
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
                <td>{calculateTotal(movies, moviePrice)}</td>
            </tr>
            </tfoot>
        )}
    </table>
);

export default CartTable;