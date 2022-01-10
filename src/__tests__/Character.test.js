import { render, screen } from "@testing-library/react";
import { skywalkerResults } from "../mocks/data";
import Character from "../components/Character";

let testCharacter;

beforeEach(() => {
  testCharacter = {
    ...skywalkerResults.results[0],
  };
});

test("displays the details about the character and their films", async () => {
  render(<Character character={testCharacter} />);

  expect(
    screen.getByRole("heading", { level: 1, name: testCharacter.name })
  ).toBeInTheDocument();

  // see the film details
  expect(await screen.findByText("A New Hope")).toBeInTheDocument();
  expect(
    await screen.findByText("The Empire Strikes Back")
  ).toBeInTheDocument();
});
