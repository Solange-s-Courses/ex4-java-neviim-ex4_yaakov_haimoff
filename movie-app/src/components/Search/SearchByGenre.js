import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select';

const SearchByGenre = ({apiKey, genres, setGenres, setMovies}) => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions);
    };

    return (
        <div className="row">
            <div className="col">
                <div className="d-flex align-items-center">
                    <Select
                        options={genres.map((genre) => ({ value: genre.id, label: genre.name }))}
                        isMulti
                        placeholder="Select genre to search"
                        onChange={handleGenreChange}
                    />
                    <button type="button" className="btn btn-light ml-2">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default SearchByGenre;