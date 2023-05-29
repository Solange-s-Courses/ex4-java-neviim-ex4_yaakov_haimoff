import React, {useEffect, useRef} from 'react';

const SearchHistory = ({
                           handleSearch,
                           setSearchTerm,
                           searchHistory,
                           setSearchHistory,
                           setIsSearchHistoryVisible
                       }) => {

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsSearchHistoryVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleRemoveSearchHistory = (index) => {
        const updatedSearchHistory = [...searchHistory];
        updatedSearchHistory.splice(index, 1);
        setSearchHistory(updatedSearchHistory);
    };

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
