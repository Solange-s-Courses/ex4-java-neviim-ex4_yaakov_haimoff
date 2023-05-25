import CartMovieRow from './CartMovieRow'

const CartTable = ({movies, setMovies}) => {
    const moviePrice = 3.99;

    const calculateTotal = () => {
        let total = 0;
        movies.forEach((movie) => {
            total += movie.count * moviePrice;
        });
        return total.toFixed(2) + '$';
    };

    return (
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
                        key={index} // Assign a unique key prop using the index value
                        movie={movie}
                        movies={movies}
                        setMovies={setMovies}
                        index={index}
                        moviePrice={moviePrice}
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