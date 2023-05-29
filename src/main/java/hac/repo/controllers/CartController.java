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

    @PostMapping("/add")
    public String addMovie(@RequestBody Movie movie) {
        List<Movie> movies = sessionCart.getMovies();
        if (movies.contains(movie)) {
            return "Movie already in cart: " + movie.getTitle();
        }
        sessionCart.add(movie);
         return "Movie added to cart: " + movie.getTitle();
    }

    @GetMapping
    public List<Movie> getCart() {
        return sessionCart.getMovies();
    }

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
