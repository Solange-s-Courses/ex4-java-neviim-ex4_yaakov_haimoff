import React, {useEffect} from 'react';
import axios from 'axios';

const GenreList = ({apiKey, setGenres}) => {
    useEffect(() => {
        // Fetch genre list from TMDB API
        console.log("changed genre list")
        axios
            .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&include_adult=false`)
            .then((response) => {
                setGenres(response.data.genres);
            })
            .catch((error) => {
                console.error('Error fetching genre list:', error);
            });
    }, [apiKey, setGenres]);

    return null;
};

export default GenreList;