import { useState } from "react";

function SearchBar({ onViewDetails }) {
  const [searchText, setSearchText] = useState("");
  const [characters, setCharacters] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`https://swapi.dev/api/people/?search=${searchText}`)
      .then((r) => r.json())
      .then((data) => setCharacters(data.results));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="character-name"
          aria-label="Character Name:"
          placeholder="Enter a character name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {characters.map((character) => (
          <li key={character.url}>
            <button onClick={() => onViewDetails(character)}>
              {character.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchBar;
