import SearchByInput from "./SearchByInput";
import SearchByGenre from "./SearchByGenre";
import {searchByTitle, searchByActor} from './SearchFunc';

const SearchMovies = ({apiKey, genres, setGenres, setMovies}) => {

    const placeHolderActor = "Search for a movie by actor"
    const placeHolderTitle = "Search for a movie by title"
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
                <SearchByGenre genres={genres} setGenres={setGenres} setMovies={setMovies}/>
            </div>
        </div>
    );
};

export default SearchMovies;