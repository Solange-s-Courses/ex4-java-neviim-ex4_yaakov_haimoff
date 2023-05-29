package hac.repo.beans;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;

@Component
public class Cart implements Serializable {
    private ArrayList<Movie> movies;
    public Cart() {
        this.movies = new ArrayList<>();
    }

    public ArrayList<Movie>  getMovies() {
        return movies;
    }

    public void add (Movie m) {
        movies.add(m);
    }

}