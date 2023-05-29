import {useState} from 'react';
import Select from 'react-select';

const SearchByGenre = ({
                           searchFunc,
                           placeHolder,
                           apiKey,
                           genres,
                           setMovies,
                       }) => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions);
    };

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