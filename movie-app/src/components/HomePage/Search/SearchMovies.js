import SearchByInput from "./SearchByInput";
import SearchByGenre from "./SearchByGenre";
import {searchByTitle, searchByActor, searchByGenre} from './SearchFunc';

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