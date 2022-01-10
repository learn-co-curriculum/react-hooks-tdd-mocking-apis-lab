import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar";
import { skywalkerResults } from "../mocks/data";

let testCharacter;

beforeEach(() => {
  testCharacter = {
    ...skywalkerResults.results[0],
  };
});

test("displays a search form", () => {
  render(<SearchBar />);

  expect(screen.getByLabelText(/character name/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
});

test("displays a list of search results based on the character", async () => {
  render(<SearchBar />);

  const characterInput = screen.getByLabelText(/character name/i);
  const searchButton = screen.getByRole("button", { name: /search/i });

  userEvent.type(characterInput, "skywalker");
  userEvent.click(searchButton);

  expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
  expect(await screen.findByText("Anakin Skywalker")).toBeInTheDocument();
});

test("clicking the view details button calls onViewDetails with the character info", async () => {
  const spyOnViewDetails = jest.fn();

  render(<SearchBar onViewDetails={spyOnViewDetails} />);

  const characterInput = screen.getByLabelText(/character name/i);
  const searchButton = screen.getByRole("button", { name: /search/i });

  userEvent.type(characterInput, "skywalker");
  userEvent.click(searchButton);

  const viewButton = await screen.findByRole("button", {
    name: "Luke Skywalker",
  });
  userEvent.click(viewButton);

  expect(spyOnViewDetails).toHaveBeenCalledWith(testCharacter);
});
