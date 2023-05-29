package hac.repo.beans;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * This class is used to store the movies that the user has added to the cart.
 * It is a bean that is used to store the movies that the user has added to the cart.
 */
@Component
public class Cart implements Serializable {
    private ArrayList<Movie> movies;

    public Cart() {
        this.movies = new ArrayList<>();
    }

    /**
     * This method is used to get the movies that the user has added to the cart.
     * @return ArrayList<Movie> This returns the movies that the user has added to the cart.
     */
    public ArrayList<Movie> getMovies() {
        return movies;
    }

    /**
     * This method is used to set the movies that the user has added to the cart.
     * @param m This is the movies that the user has added to the cart.
     */
    public void add(Movie m) {
        movies.add(m);
    }

}