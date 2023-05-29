import {useState} from 'react';
import Select from 'react-select';

/**
 * A component that renders a search bar for movies by genre
 * @param searchFunc - a function that searches for movies by genre
 * @param placeHolder - a placeholder for the search bar
 * @param apiKey - the API key for the TMDB API
 * @param genres - a list of genres
 * @param setMovies - a function that sets the movies state
 */
const SearchByGenre = ({
                           searchFunc,
                           placeHolder,
                           apiKey,
                           genres,
                           setMovies,
                       }) => {
    const [selectedGenres, setSelectedGenres] = useState([]);

    /**
     * A function that handles the change of the selected genres
     * @param selectedOptions - the selected genres
     * @returns {void}
     */
    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions);
    };

    /**
     * A function that fetches movies by genre
     * @returns {void}
     */
    function fetchGenreMovies() {
        searchFunc(apiKey, selectedGenres, setMovies);
    }

    return (
        <div className="row">
            <div className="col">
                <div className="d-flex align-items-center">
                    <Select
                        options={genres.map((genre) => ({value: genre.id, label: genre.name}))}
                        placeholder={placeHolder}
                        value={selectedGenres}
                        onChange={handleGenreChange}
                    />
                    <button type="button" className="btn btn-light ml-2" onClick={fetchGenreMovies}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchByGenre;