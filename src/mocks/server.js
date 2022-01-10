import { rest } from "msw";
import { setupServer } from "msw/node";
import { films, skywalkerResults } from "./data";

const handlers = [
  rest.get("https://swapi.dev/api/people", (req, res, ctx) => {
    return res(ctx.json(skywalkerResults));
  }),
  rest.get("https://swapi.dev/api/films/:id", (req, res, ctx) => {
    const { id } = req.params;
    const filmIndex = parseInt(id) - 1;

    return res(ctx.json(films[filmIndex]));
  }),
];

export const server = setupServer(...handlers);
