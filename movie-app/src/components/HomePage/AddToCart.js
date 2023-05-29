import React, {useContext, useState} from "react";
import { CartContext } from './CartContext';

const AddToCart = (movie) => {
    const [cartItems, setCartItems] = useState([]);
    const { updateCartSize } = useContext(CartContext);
    const price = 3.99;

    function parseMovie(movie) {
        movie = {
            poster_path: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date.substring(0, 4),
            price:price,
        }
        return movie;
    }

    function handlePostFunction(movie) {
        movie = parseMovie(movie);
        updateCartSize(previousSize => previousSize + 1);
        setCartItems((prevItems) => [...prevItems, movie]);

        fetch("/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movie),
        })
            .then(handleResponse)
            .catch(handleError);
    }

    function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`Some error occurred: ${response.status} ${response.statusText}`);
        }
        return response.text();
    }

    function handleError(error) {
        console.log(error.toString());
    }

    const isMovieInCart = (movie) => {
        return cartItems.some((item) => item.title === movie.title);
    };

    const handleRemoveFunction = (movie) => {
        movie = parseMovie(movie);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== movie.id));
        updateCartSize(previousSize => previousSize - 1);
        fetch("/api/cart/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movie),
        })
            .then(handleResponse)
            .catch(handleError);
    };

    return (
        <div className="col-5">
            {isMovieInCart(movie.movie) ? (
                <a
                    href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        handleRemoveFunction(movie.movie);
                    }}
                    className="float-right"
                    style={{textDecoration: "none"}}
                >
                    <i className="bi bi-x-square"></i>
                </a>
            ) : (
                <a
                    href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        handlePostFunction(movie.movie);
                    }}
                    className="float-right"
                    style={{textDecoration: "none"}}
                >
                    <i className="bi bi-cart"></i>
                </a>
            )}
        </div>
    );
};

export default AddToCart;