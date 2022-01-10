import FilmCard from "./FilmCard";

function Character({ character }) {
  return (
    <div>
      <h1>{character.name}</h1>
      <h2>Films</h2>
      <div className="cards">
        {character.films.map((filmUrl) => (
          <FilmCard key={filmUrl} filmUrl={filmUrl} />
        ))}
      </div>
    </div>
  );
}

export default Character;
