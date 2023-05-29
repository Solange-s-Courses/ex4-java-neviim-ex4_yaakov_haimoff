import React, { useEffect } from 'react';
import axios from 'axios';

/**
 * A component that fetches data from TMDB API
 * and sets the state variables
 * @param apiKey - TMDB API key
 * @param setGenres - set the genres state variable
 * @param setMovies - set the movies state variable
 * @returns {JSX.Element}
 */
const DataFetcher = ({ apiKey, setGenres, setMovies }) => {

    /**
     * Fetch discover movies from TMDB API for the home page
     * and set the movies state variable
     */
    useEffect(() => {
        // Fetch movies from TMDB API
        axios.get(`https://api.themoviedb.org/3/discover/movie`, {params: {api_key: apiKey,},})
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    /**
     * Fetch genre list from TMDB API
     * and set the genres state variable
     */
    useEffect(() => {
        // Fetch genre list from TMDB API
        axios
            .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&include_adult=false`)
            .then((response) => {
                setGenres(response.data.genres);
            })
            .catch((error) => {
                console.error('Error fetching genre list:', error);
            });
    }, [apiKey, setGenres]);
};

export default DataFetcher;
