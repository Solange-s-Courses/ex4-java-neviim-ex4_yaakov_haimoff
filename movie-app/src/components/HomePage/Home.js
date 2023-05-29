import React, {useState} from 'react';

import SearchMovies from './Search/SearchMovies';
import RenderMoviesInRows from './RenderMoviesInRows';
import DataFetcher from './DataFetcher';

const Home = () => {
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);

    const apiKey = '123bc8f0272a9cf87480a00de8448316';

    return (
        <div className="bg-black">
            <div className="card-body">
                <DataFetcher apiKey={apiKey} setGenres={setGenres} setMovies={setMovies}/>
                <SearchMovies apiKey={apiKey} genres={genres} setMovies={setMovies}/>
                <RenderMoviesInRows movies={movies}/>
            </div>
        </div>
    );
};

export default Home;
