import React, { useEffect } from 'react';
import axios from 'axios';

const DataFetcher = ({ apiKey, setGenres, setMovies }) => {
    // get movies
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

    // get genres
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
