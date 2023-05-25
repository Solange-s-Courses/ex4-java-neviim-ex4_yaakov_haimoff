import React, {useEffect, useState} from 'react';
import axios from 'axios';

import GenreList from './GenreList';
import SearchMovies from './SearchMovies';
import RenderMoviesInRows from './RenderMoviesInRows';

const Home = () => {
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);

    const apiKey = '123bc8f0272a9cf87480a00de8448316';

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

    return (
        <div className="bg-black">
            <div className="card-body">
                <SearchMovies apiKey={apiKey} genres={genres} setGenres={setGenres} setMovies={setMovies}/>
                <GenreList apiKey={apiKey} setGenres={setGenres}/>
                <RenderMoviesInRows movies={movies}/>
            </div>
        </div>
    );
};

export default Home;
