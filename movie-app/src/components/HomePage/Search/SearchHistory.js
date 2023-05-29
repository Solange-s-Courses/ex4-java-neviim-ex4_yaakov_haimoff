import React, {useEffect, useRef} from 'react';

/**
 * A component that renders a list of search history terms
 * @param handleSearch - function that handles the search
 * @param setSearchTerm - function that sets the search term
 * @param searchHistory - array of search history terms
 * @param setSearchHistory - function that sets the search history
 * @param setIsSearchHistoryVisible - function that sets the visibility of the search history
 * @returns {JSX.Element}
 */
const SearchHistory = ({
                           handleSearch,
                           setSearchTerm,
                           searchHistory,
                           setSearchHistory,
                           setIsSearchHistoryVisible
                       }) => {

    const dropdownRef = useRef(null);

    /**
     * A function that handles the click outside the search history dropdown
     * If the click is outside the dropdown, the dropdown is closed
     * @param event - the click event
     * @returns {void}
     */
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsSearchHistoryVisible(false);
        }
    };

    /**
     * A function that adds an event listener to the document
     * @returns {void}
     */
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    /**
     * A function that removes a search history term from the search history
     * @param index - the index of the search history term to be removed
     * @returns {void}
     */
    const handleRemoveSearchHistory = (index) => {
        const updatedSearchHistory = [...searchHistory];
        updatedSearchHistory.splice(index, 1);
        setSearchHistory(updatedSearchHistory);
    };

    /**
     * A function that handles the click on a search history term
     * It sets the search term and calls the handleSearch function
     * @param historyTerm - the search history term
     * @returns {void}
     */
    const handleSearchHistoryClick = (historyTerm) => {
        setSearchTerm(historyTerm);
        setIsSearchHistoryVisible(false);
        handleSearch(historyTerm);
    };
    return (
        <div className="search-history-dropdown" ref={dropdownRef}>
            {searchHistory.map((term, index) => (
                <div className="row" key={index}>
                    <div className="col-9"
                         style={{color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center'}}
                         onClick={() => handleSearchHistoryClick(term)}>
                        {term}
                    </div>
                    <div className="col-1">
                        <button className="btn btn-link" onClick={() => handleRemoveSearchHistory(index)}
                                style={{color: 'white'}}>
                            <i className="bi bi-x-square"></i>
                        </button>
                    </div>
                </div>
            ))}
            {searchHistory.length > 0 && (
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-link" onClick={() => setSearchHistory([])}
                                style={{color: 'white', textDecoration: 'none'}}>
                            Clear All Search
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchHistory;
