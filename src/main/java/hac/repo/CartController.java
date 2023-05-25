package hac.repo;

import hac.repo.beans.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    @Qualifier("sessionScopeBean")
    private Cart sessionCart;

    @PostMapping("/add")
    public String addMovie(@RequestBody String movieTitle) {
        List<String> movies = sessionCart.getMovies();
        if (movies.contains(movieTitle)) {
            return "Movie already in cart: " + movieTitle;
        }
        sessionCart.add(movieTitle);
         return "Movie added to cart: " + movieTitle;
    }

    @GetMapping
    public List<String> getCart() {
        return sessionCart.getMovies();
    }
}
