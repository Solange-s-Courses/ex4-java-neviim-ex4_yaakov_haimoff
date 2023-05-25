import React from "react";

const renderMoviesInRows = ({movies}) => {
        const rows = [];
        let row = [];

        function handlePostFunction(movieTitle) {
            fetch("/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieTitle),
            })
                .then(handleResponse)
                .catch(handleError);
        }

        function handleResponse(response) {
            if (!response.ok) {
                throw new Error(`Some error occurred : ${response.status} ${response.statusText}`);
            }
            return response.text();
        }

        function handleError(error) {
            console.log(error.toString());
        }

        movies.forEach((movie, index) => {
            row.push(
                <div key={movie.id} className="col-md-4 mb-12 col-lg-3">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="card-img-top"
                        style={{width: "200px", height: "300px"}} // Set custom width and height
                    />

                    <div className="row">
                        <h3 className="float-right">{movie.title}</h3>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <span className="float-right">Vote: {movie.vote_average}</span>
                        </div>

                        <div className="col-4">
                            <span className="float-right">Release: {movie.release_date.substring(0, 4)}</span>
                        </div>
                    </div>
                    <div className="row">
                        <a href="#" onClick={(event) => {
                            event.preventDefault()
                            handlePostFunction(movie.title)
                        }}
                           className="float-right"
                           style={{textDecoration: 'none'}}>
                            Add to cart
                        </a>
                    </div>

                </div>
            );

            if (row.length === 4) {
                rows.push(<div key={index} className="row">{row}</div>);
                row = [];
            }
        });

        // Add the last row if it has fewer than 3 movies
        if (row.length > 0) {
            rows.push(<div key={movies.length} className="row">{row}</div>);
        }

        return <div>{rows}</div>;
    };

export default renderMoviesInRows;
