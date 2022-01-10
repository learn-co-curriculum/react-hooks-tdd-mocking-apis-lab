import { useEffect, useState } from "react";

function FilmCard({ filmUrl }) {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    fetch(filmUrl)
      .then((r) => r.json())
      .then((film) => setFilm(film));
  }, [filmUrl]);

  if (!film) {
    return (
      <article>
        <span>Loading...</span>
      </article>
    );
  }

  return (
    <article>
      <h2>{film.title}</h2>
      <p>{film.opening_crawl}</p>
    </article>
  );
}

export default FilmCard;
