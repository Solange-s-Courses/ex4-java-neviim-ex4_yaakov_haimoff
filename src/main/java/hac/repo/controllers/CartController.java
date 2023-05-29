package hac.repo.controllers;

import hac.repo.beans.Cart;
import hac.repo.beans.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    @Qualifier("sessionScopeBeanCart")
    private Cart sessionCart;

    /**
     * Add a movie to the cart if it is not already in the cart
     * @param movie the movie to add
     * @return a message indicating whether the movie was added or not
     */
    @PostMapping("/add")
    public String addMovie(@RequestBody Movie movie) {
        List<Movie> movies = sessionCart.getMovies();
        if (movies.contains(movie)) {
            return "Movie already in cart: " + movie.getTitle();
        }
        sessionCart.add(movie);
         return "Movie added to cart: " + movie.getTitle();
    }

    /**
     * Get the cart
     * @return the cart
     */
    @GetMapping
    public List<Movie> getCart() {
        return sessionCart.getMovies();
    }

    /**
     * Delete a movie from the cart if it is in the cart
     * @param movie the movie to delete
     * @return a message indicating whether the movie was deleted or not
     */
    @DeleteMapping("/delete")
    public String deleteFromCart(@RequestBody Movie movie) {
        List<Movie> movies = sessionCart.getMovies();
        if (movies.contains(movie)) {
            movies.remove(movie);
            return "Movie deleted from cart: " + movie.getTitle();
        }
        return "Movie not found in cart: " + movie.getTitle();
    }
}
