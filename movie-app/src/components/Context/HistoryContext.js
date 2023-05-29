import React, {createContext, useState} from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({children}) => {
    let [historySearch, setHistorySearch] = useState('');

    const updateHistorySearch = (history) => {
        console.log('updateHistorySearch', history);
        // setHistorySearch(history);
        // addToSearchHistory(history)
        setHistorySearch((prevHistory) => {
            // Check if the searchTerm already exists in the history
            if (!prevHistory.includes(history)) {
                // Add the searchTerm to the beginning of the history
                return [history, ...prevHistory];
            }
            return prevHistory;
        });
    };

    const addToSearchHistory = (term) => {
        setHistorySearch((prevHistory) => {
            // Check if the searchTerm already exists in the history
            if (!prevHistory.includes(term)) {
                // Add the searchTerm to the beginning of the history
                return [term, ...prevHistory];
            }
            return prevHistory;
        });
    };


    return (
        <HistoryContext.Provider value={{historySearch, updateHistorySearch}}>
            {children}
        </HistoryContext.Provider>
    );
};