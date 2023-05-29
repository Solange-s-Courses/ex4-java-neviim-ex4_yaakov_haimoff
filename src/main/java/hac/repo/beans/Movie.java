package hac.repo.beans;

import java.io.Serializable;

public class Movie implements Serializable {

    private String posterPath, title;
    private int releaseDate, price;

    public Movie(String posterPath, String title, int release_date, int price) {
        this.posterPath = posterPath;
        this.title = title;
        this.releaseDate = release_date;
        this.price = price;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(int releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
