import { useState } from "react";
import Character from "./Character";
import SearchBar from "./SearchBar";

function App() {
  const [character, setCharacter] = useState(null);

  function handleViewDetails(character) {
    setCharacter(character);
  }

  return (
    <div className="App">
      <nav>
        <h1>SWAPI Search</h1>
        <SearchBar onViewDetails={handleViewDetails} />
      </nav>
      <main>{character ? <Character character={character} /> : null}</main>
    </div>
  );
}

export default App;
