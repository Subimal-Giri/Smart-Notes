import { useSearch } from "../hooks/useSearch.js";
import SearchBar from "../components/search/SearchBar.jsx";
import SearchResults from "../components/search/SearchResults.jsx";
import Header from "../components/layout/Header.jsx";

function SearchPage() {
    const { query, setQuery, results, searching } = useSearch();
    
    return (
        <>
            <Header title="Search" subtitle="Search across every note's title and content" />
            <div className="search-wrap">
                <SearchBar query={query} onChange={setQuery} placeholder="Search notes by title or content…" autoFocus />
            </div>
            <div className="search-results-area">
                <SearchResults results={results} searching={searching} query={query} />
            </div>
        </>
    );
}

export default SearchPage;
