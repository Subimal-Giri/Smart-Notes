function SearchBar({ query, onChange, placeholder = 'Search notes…', autoFocus = false }) {
    return (
        <div className="search-field">
            <span className="search-field__icon"><i className="fa-solid fa-magnifying-glass" /></span>
            <input
                className="search-input"
                value={query}
                autoFocus={autoFocus}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
            {query && (
                <button className="search-clear" onClick={() => onChange('')}>
                    <i className="fa-solid fa-circle-xmark" />
                </button>
            )}
        </div>
    );
}

export default SearchBar;
