import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  // TODO: write the handlers!
];

export const server = setupServer(...handlers);
