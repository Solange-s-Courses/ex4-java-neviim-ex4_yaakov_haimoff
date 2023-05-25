package hac.repo.beans;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;

@Component
public class Cart implements Serializable {
    private ArrayList<String> movies;
    public Cart() {
        this.movies = new ArrayList<>();
    }

    public ArrayList<String>  getMovies() {
        return movies;
    }

    public void add (String m) {
        movies.add(m);
    }

}