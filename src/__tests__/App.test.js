import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../components/App";

test("displays a welcome message", () => {
  render(<App />);

  const heading = screen.getByRole("heading", {
    level: 1,
    name: /swapi search/i,
  });

  expect(heading).toBeInTheDocument();
});

test("displays the character details when a character is selected", async () => {
  render(<App />);

  // search a character
  const characterInput = screen.getByLabelText(/character name/i);
  const searchButton = screen.getByRole("button", { name: /search/i });

  userEvent.type(characterInput, "skywalker");
  userEvent.click(searchButton);

  // click a character
  const lukeButton = await screen.findByRole("button", {
    name: "Luke Skywalker",
  });
  lukeButton.click();

  // see the character details
  expect(await screen.findByText("A New Hope")).toBeInTheDocument();
  expect(
    await screen.findByText("The Empire Strikes Back")
  ).toBeInTheDocument();
});
