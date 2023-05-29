import React, {useContext, useState} from "react";
import { CartContext } from '../Context/CartContext';

/**
 * A component that renders a button to add a movie to the cart
 * and handles the POST request to the server
 * @param movie - the movie to be added to the cart
 * @returns {JSX.Element}
 */
const AddToCart = (movie) => {
    const [cartItems, setCartItems] = useState([]);
    const { updateCartSize } = useContext(CartContext);
    const price = 3.99;

    /**
     * Parses the movie object to the format required by the server
     * and returns it
     * @param movie - the movie to be parsed
     * @returns {{release_date: string, price: number, title, poster_path}}
     */
    function parseMovie(movie) {
        movie = {
            poster_path: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date.substring(0, 4),
            price:price,
        }
        return movie;
    }

    /**
     * Handles the POST request to the server
     * and updates the cart size
     * @param movie - the movie to be added to the cart
     * @returns {Promise<void>}
     */
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

    /**
     * Handles the response from the server
     * and throws an error if the response is not ok
     * @param response - the response from the server
     * @returns {*} - the response text
     */
    function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`Some error occurred: ${response.status} ${response.statusText}`);
        }
        return response.text();
    }

    /**
     * Handles the error and prints it to the console
     * @param error - the error to be handled
     * @returns {void}
     */
    function handleError(error) {
        console.log(error.toString());
    }

    /**
     * Checks if the movie is already in the cart
     * @param movie - the movie to be checked
     * @returns {boolean} - true if the movie is in the cart, false otherwise
     */
    const isMovieInCart = (movie) => {
        return cartItems.some((item) => item.title === movie.title);
    };

    /**
     * Handles the DELETE request to the server
     * and updates the cart size
     * @param movie - the movie to be removed from the cart
     * @returns {Promise<void>}
     */
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