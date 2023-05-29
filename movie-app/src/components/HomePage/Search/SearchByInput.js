import React, {useState, useContext} from 'react';
import SearchHistory from "./SearchHistory";
// import {HistoryContext} from '../../Context/HistoryContext';


/**
 * A component that searches with a search bar input
 * @param searchFunc - the function that will be called when the user clicks the search button
 * @param placeHolder - the placeholder text for the search input
 * @param apiKey - the API key for TMDB
 * @param setMovies - the function that will be called to update the movies state
 * @returns {JSX.Element}
 */
const SearchByInput = ({searchFunc, placeHolder, apiKey, setMovies}) => {
    // const {historySearch, updateHistorySearch} = useContext(HistoryContext);
    const [historySearch, setHistorySearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchHistoryVisible, setIsSearchHistoryVisible] = useState(false);

    /**
     * A function that handles the input change
     * It updates the searchTerm state
     * @param event - the event object
     * @returns {void}
     */
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    /**
     * A function that handles the search
     * It calls the searchFunc function with the search term
     * It updates the searchTerm state
     * It updates the historySearch state
     * @param search - the search term
     * @returns {void}
     */
    const handleSearch = (search = searchTerm) => {
        const params = {
            query: search,
            include_adult: false,
        };
        searchFunc(params, apiKey, search, setMovies, setSearchTerm, setHistorySearch, historySearch);
    };

    return (
        <div className="search-bar">
            <div className="search-input-container d-flex align-items-center">
                <input
                    type="search"
                    className="form-control rounded mr-2"
                    placeholder={placeHolder}
                    aria-label="SearchByInput"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    onFocus={() => setIsSearchHistoryVisible(true)}
                    aria-describedby="search-addon"
                />
                <button type="button" className="btn btn-light"
                        onClick={handleSearch}>
                    <i className="bi bi-search"></i>
                </button>
            </div>
            {isSearchHistoryVisible && historySearch.length > 0 && (
                <SearchHistory
                    handleSearch={handleSearch}
                    setSearchTerm={setSearchTerm}
                    searchHistory={historySearch}
                    setSearchHistory={setHistorySearch}
                    setIsSearchHistoryVisible={setIsSearchHistoryVisible}
                />
            )}
        </div>
    );
};

export default SearchByInput;
