import SearchByInput from "./SearchByInput";
import SearchByGenre from "./SearchByGenre";
import {searchByTitle, searchByActor, searchByGenre} from './SearchFunc';

/**
 * This component is used to search for movies by title, actor, or genre.
 * It uses the SearchByInput and SearchByGenre components.
 * It is used in the HomePage component.
 * @param apiKey - the API key used to access the movie database
 * @param genres - the list of genres
 * @param setMovies - the function used to set the list of movies
 * @returns {JSX.Element}
 */
const SearchMovies = ({apiKey, genres, setMovies}) => {

    const placeHolderActor = "Search for a movie by actor"
    const placeHolderTitle = "Search for a movie by title"
    const placeHolderGenre = "Search for a movie by genre"
    return (
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
                <SearchByInput
                    searchFunc={searchByTitle}
                    placeHolder={placeHolderTitle}
                    apiKey={apiKey}
                    setMovies={setMovies}
                />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
                <SearchByInput
                    searchFunc={searchByActor}
                    placeHolder={placeHolderActor}
                    apiKey={apiKey}
                    setMovies={setMovies}
                />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <SearchByGenre
                    searchFunc={searchByGenre}
                    placeHolder={placeHolderGenre}
                    apiKey={apiKey}
                    genres={genres}
                    setMovies={setMovies}/>
            </div>
        </div>
    );
};

export default SearchMovies;