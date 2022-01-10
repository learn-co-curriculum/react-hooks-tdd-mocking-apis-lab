import { render, screen } from "@testing-library/react";
import FilmCard from "../components/FilmCard";

test("displays the details from a given film URL", async () => {
  render(<FilmCard filmUrl="https://swapi.dev/api/films/2/" />);

  const heading = await screen.findByRole("heading", {
    level: 2,
    name: "The Empire Strikes Back",
    exact: false,
  });

  const crawl = await screen.findByText("It is a dark time for the", {
    exact: false,
  });

  expect(heading).toBeInTheDocument();
  expect(crawl).toBeInTheDocument();
});
