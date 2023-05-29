import axios from 'axios';

/**
 * Add the searchTerm to the beginning of the history.
 * If the searchTerm already exists in the history, filter it out from the history.
 * @param setSearchHistory - the function to set the searchHistory
 * @param term - the searchTerm to add to the history
 * @returns {void}
 */
const addToSearchHistory = (setSearchHistory, term) => {
    setSearchHistory((prevHistory) => {
        // Check if the searchTerm already exists in the history
        if (prevHistory.includes(term)) {
            // If it exists, filter it out from the history
            prevHistory = prevHistory.filter((item) => item !== term);
        }
        // Add the searchTerm to the beginning of the history
        return [term, ...prevHistory];
    });
};

/**
 * Fetch movies from TMDB API by title
 * @param params - the params to pass to the API
 * @param apiKey - the API key
 * @param searchTerm - the search term - the movie title
 * @param setMovies - the function to set the movies
 * @param setSearchTerm - the function to set the searchTerm
 * @param setSearchHistory - the function to set the searchHistory
 * @param searchHistory - the searchHistory
 * @returns {void}
 */
const searchByTitle = (params, apiKey, searchTerm, setMovies, setSearchTerm, setSearchHistory, searchHistory) => {
    // Fetch movies from TMDB API by title
    axios
        .get("https://api.themoviedb.org/3/search/movie",
            {params: {api_key: apiKey, query: searchTerm, ...params}})
        .then((response) => {
            setMovies(response.data.results);
        })
        .catch((error) => {
            console.error('Error fetching movies by title:', error);
        });

    // Add search term to history
    addToSearchHistory(setSearchHistory, searchTerm);

    // Clear the search input
    setSearchTerm('');
};

/**
 * Fetch movies from TMDB API by Actor
 * @param params - the params to pass to the API
 * @param apiKey - the API key
 * @param actorName - the search term - actor name
 * @param setMovies - the function to set the movies
 * @param setSearchTerm - the function to set the searchTerm
 * @param setSearchHistory - the function to set the searchHistory
 * @param searchHistory - the searchHistory
 * @returns {void}
 */
const searchByActor = (params, apiKey, actorName, setMovies, setSearchTerm, setSearchHistory, searchHistory) => {
    // Fetch actor details from TMDB API
    axios
        .get("https://api.themoviedb.org/3/search/person", {
            params: {api_key: apiKey, query: actorName},
        })
        .then((response) => {
            if (response.data.results && response.data.results.length > 0) {
                const actorId = response.data.results[0].id;

                // Fetch combined credits of the actor
                axios
                    .get(`https://api.themoviedb.org/3/person/${actorId}/combined_credits`, {
                        params: {api_key: apiKey},
                    })
                    .then((creditsResponse) => {
                        const movies = creditsResponse.data.cast.filter((credit) => credit.media_type === "movie");
                        setMovies(movies);
                    })
                    .catch((error) => {
                        console.error('Error fetching actor credits:', error);
                    });
            } else {
                setMovies([]); // Set movies to an empty array when no results are found
            }
        })
        .catch((error) => {
            console.error('Error fetching actor details:', error);
        });

    // Add search term to history
    addToSearchHistory(setSearchHistory, actorName);

    // Clear the search input
    setSearchTerm('');
};

/**
 * Fetch movies from TMDB API by genre
 * @param apiKey - the API key
 * @param selectedGenres - the selected genres
 * @param setMovies - the function to set the movies
 * @returns {void}
 */
const searchByGenre = (apiKey, selectedGenres, setMovies) => {
    const genreId = selectedGenres ? selectedGenres.value : null;

    if (genreId) {
        const params = {
            with_genres: genreId,
            include_adult: false,
            page: 1,
        };

        axios
            .get(`https://api.themoviedb.org/3/discover/movie`, {
                params: {api_key: apiKey, ...params},
            })
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching genre movies:', error);
            });
    } else {
        setMovies([]); // Set movies to an empty array when no genre is selected
    }
};

export {searchByTitle, searchByActor, searchByGenre};
