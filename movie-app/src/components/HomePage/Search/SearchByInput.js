import React, {useState} from 'react';
import SearchHistory from "./SearchHistory";

const SearchByInput = ({searchFunc, placeHolder, apiKey, setMovies}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [isSearchHistoryVisible, setIsSearchHistoryVisible] = useState(false);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (search = searchTerm) => {
        const params = {
            query: search,
            include_adult: false,
        };
        searchFunc(params, apiKey, search, setMovies, setSearchTerm, setSearchHistory, searchHistory);
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
            {isSearchHistoryVisible && searchHistory.length > 0 && (
                <SearchHistory
                    handleSearch={handleSearch}
                    setSearchTerm={setSearchTerm}
                    searchHistory={searchHistory}
                    setSearchHistory={setSearchHistory}
                    setIsSearchHistoryVisible={setIsSearchHistoryVisible}
                />
            )}
        </div>
    );
};

export default SearchByInput;
