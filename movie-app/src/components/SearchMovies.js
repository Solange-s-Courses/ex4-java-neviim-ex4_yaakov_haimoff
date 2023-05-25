import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select';

const SearchMovies = ({apiKey, genres, setGenres, setMovies}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [isSearchHistoryVisible, setIsSearchHistoryVisible] = useState(false);

    const handleSearch = () => {
        // Construct the query parameters
        const params = {
            query: searchTerm,
            include_adult: false,
        };

        // Add selected genres to the query parameters
        if (selectedGenres.length > 0) {
            const genreIds = selectedGenres.map((genre) => genre.value);
            params.with_genres = genreIds.join(',');
        }

        // Fetch movies from TMDB API
        axios
            .get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: apiKey,
                    ...params,
                },
            })
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
            });

        // Add search term to history
        setSearchHistory((prevHistory) => [searchTerm, ...prevHistory]);
        console.log("searchHistory", searchHistory)

        // Clear the search input
        setSearchTerm('');
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions);
    };

    const handleSearchHistoryClick = (historyTerm) => {
        console.log('historyTerm:', historyTerm)
        setSearchTerm(historyTerm);
        setIsSearchHistoryVisible(false);
        handleSearch();
    };

    useEffect(() => {
        // Save search history to local storage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);

    useEffect(() => {
        // Load search history from local storage
        const history = localStorage.getItem('searchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);

    return (
        <div>
            <div className="search-bar">
                <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    onFocus={() => setIsSearchHistoryVisible(true)}
                    onBlur={() => setIsSearchHistoryVisible(false)}
                    
                    aria-describedby="search-addon"
                />
                {isSearchHistoryVisible && searchHistory.length > 0 && (
                    <div className="search-history-dropdown">
                        {searchHistory.map((term, index) => (
                            <div
                                style={{color: 'white', cursor: 'pointer'}}
                                key={index}
                                onClick={() => handleSearchHistoryClick(term)}
                            >
                                {term}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <br/>
            <Select
                options={genres.map((genre) => ({value: genre.id, label: genre.name}))}
                isMulti
                placeholder="Select genres"
                onChange={handleGenreChange}
            />
        </div>
    );
};

export default SearchMovies;