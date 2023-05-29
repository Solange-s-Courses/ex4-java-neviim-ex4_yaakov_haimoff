import CartMovieRow from './CartMovieRow'

const CartTable = ({movies, setMovies, calculateTotal}) => {
    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>#</th>
                <th>Movie Image</th>
                <th>Movie Title</th>
                <th>Movie Release Date</th>
                <th>Weeks</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(movies) && movies.length > 0 ? (
                movies.map((movie, index) => (
                    <CartMovieRow
                        key={index} // Assign a unique key prop using the index value
                        movie={movie}
                        movies={movies}
                        setMovies={setMovies}
                        index={index}
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
                    <td>{calculateTotal()}</td>
                </tr>
                </tfoot>
            )}
        </table>
    );
};

export default CartTable;