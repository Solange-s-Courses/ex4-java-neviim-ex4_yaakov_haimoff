import axios from 'axios';

const searchByTitle = (params, apiKey, searchTerm, setMovies, setSearchTerm, setSearchHistory, searchHistory) => {
    // Fetch movies from TMDB API by title
    axios
        .get("https://api.themoviedb.org/3/search/movie",
            { params: { api_key: apiKey, query: searchTerm, ...params } })
        .then((response) => {
            setMovies(response.data.results);
        })
        .catch((error) => {
            console.error('Error fetching movies by title:', error);
        });

    // Add search term to history
    setSearchHistory((prevHistory) => [searchTerm, ...prevHistory]);
    console.log('searchHistory', searchHistory);

    // Clear the search input
    setSearchTerm('');
};

const searchByActor = (params, apiKey, actorName, setMovies, setSearchTerm, setSearchHistory, searchHistory) => {
    // Fetch actor details from TMDB API
    axios
        .get("https://api.themoviedb.org/3/search/person", {
            params: { api_key: apiKey, query: actorName },
        })
        .then((response) => {
            if (response.data.results && response.data.results.length > 0) {
                const actorId = response.data.results[0].id;

                // Fetch combined credits of the actor
                axios
                    .get(`https://api.themoviedb.org/3/person/${actorId}/combined_credits`, {
                        params: { api_key: apiKey },
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
    setSearchHistory((prevHistory) => [actorName, ...prevHistory]);
    console.log('searchHistory', searchHistory);

    // Clear the search input
    setSearchTerm('');
};


export { searchByTitle, searchByActor };
