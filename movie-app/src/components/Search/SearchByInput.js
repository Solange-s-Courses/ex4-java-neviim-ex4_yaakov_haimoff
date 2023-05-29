import React, {useState, useEffect} from 'react';

const SearchByInput = ({searchFunc, placeHolder, apiKey, setMovies}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchHistoryVisible, setIsSearchHistoryVisible] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchHistoryClick = (historyTerm) => {
        console.log('historyTerm:', historyTerm)
        setSearchTerm(historyTerm);
        setIsSearchHistoryVisible(false);
        handleSearch();
    };

    const handleSearch = () => {
        const params = {
            query: searchTerm,
            include_adult: false,
        };
        //spiderman
        // batman
        console.log("searchTerm", searchTerm)
        searchFunc(params, apiKey, searchTerm, setMovies, setSearchTerm, setSearchHistory, searchHistory);
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
                    // onBlur={() => setIsSearchHistoryVisible(false)}
                    aria-describedby="search-addon"
                />
                <button type="button" className="btn btn-light">
                    <i className="bi bi-search"></i>
                </button>
            </div>
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
    );
}

export default SearchByInput;
