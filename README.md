# Mocking APIs Lab

## Learning Goals

- Set up a mock server using the Mock Service Worker library
- Use a mock server when testing a React component

## Introduction

In this lesson, we'll get some more practice using `msw` to mock APIs in our
tests. The application we've built for this lab is a Star Wars character
explorer. It uses the Star Wars API ([SWAPI][swapi]) to get data about Star Wars
characters and films. As a user of this app, we can:

- Type in the search bar and see a list of characters whose names match the
  search term
- Click on a character and see a list of their films

The completed app is done, but we need to set up `msw` for our tests so that we
avoid interacting with the actual SWAPI when our tests are running.

You can explore the finished app by running it in the browser:

```console
$ npm install && npm start
```

Check out the completed app at [http://localhost:3000/](http://localhost:3000/).
Use the search bar on the left-hand side to search for a character (for example,
"skywalker"), then click a name to view their film info on the right-hand side.

## Component Explanation

Let's take a look at the components in this application that interact with the
API. First, there's the `<SearchBar>` component:

```js
// src/components/SearchBar.js

function handleSubmit(e) {
  e.preventDefault();
  fetch(`https://swapi.dev/api/people/?search=${searchText}`)
    .then((r) => r.json())
    .then((data) => setCharacters(data.results));
}
```

When a user submits the search form, this will search a list of people in the
SWAPI and return a list of results that looks like this:

```js
{
  count: 3,
  results: [
    {
      // extra data omitted
      name: "Luke Skywalker",
      films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/",
      ],
      url: "https://swapi.dev/api/people/1/",
    },
    {
      name: "Anakin Skywalker",
      films: [
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/",
      url: "https://swapi.dev/api/people/11/",
    },
    {
      name: "Shmi Skywalker",
      films: [
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
      ],
      url: "https://swapi.dev/api/people/43/",
    },
  ],
};
```

The `https://swapi.dev/api/people` URL is one of the URLs you'll need to mock
when testing.

After receiving the results, when the user clicks on one of the characters in
the `<SearchBar>` component, the character's data will be saved in state in the
`<App>` component.

From the `<App>` component, the character data makes its way down to the
`<Character>` and `<FilmCard>` components, and the `<FilmCard>` components use a
`filmUrl` prop to retrieve the film data from the API:

```js
// src/components/FilmCard.js
function FilmCard({ filmUrl }) {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    fetch(filmUrl)
      .then((r) => r.json())
      .then((film) => setFilm(film));
  }, [filmUrl]);

  // ...rest of component
}
```

The `filmUrl` looks like this: `https://swapi.dev/api/films/4/`, with the ID of
the film at the end of the URL, and we'll also need to mock it for testing. We
can access a list of URLs for all films the character has been in from the
character object in the search results.

Here's what a film object from the API looks like:

```js
{
  title: "A New Hope",
  opening_crawl:
    "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
  director: "George Lucas",
  producer: "Gary Kurtz, Rick McCallum",
}
```

## Instructions

If you run the tests now with `npm test`, you'll notice that the tests are all
passing, but we're getting a whole lot of warning messages in the console. The
reason for this is that we've configured `msw` to run before all of our tests:

```js
// src/setupTests.js
import { server } from "./mocks/server";

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "warn",
  })
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
```

But we haven't set up any handlers yet to intercept the API requests:

```js
// src/mocks/server.js
import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  // TODO: write the handlers!
];

export const server = setupServer(...handlers);
```

To get rid of the warnings, you'll need to use `msw` to create two new route
handlers for the following URLs:

### `https://swapi.dev/api/people`

When a request is made to this route, send a mock response in JSON format with
the data from the `skywalkerResults` variable in the `src/mocks/data.js` file.

### `https://swapi.dev/api/films/:id`

When a request is made to this route, send a mock response in JSON format with
the data from the specific film in the `films` variable in the
`src/mocks/data.js` file.

In order to set up the route handler, you can use a route parameter to identify
the ID from the url as in
[this example](https://mswjs.io/docs/api/rest#examples).

You'll then need to use that ID to access the appropriate film from the `films`
array and return it. You can subtract 1 from the ID in the URL and use that as
the index position to access the correct film from the `films` array.

## Hints

Remember, our goal with `msw` is to recreate as much of the functionality of an
external API as necessary in order to give ourselves control over the testing
environment.

You shouldn't need to update data in any of the files other than
`src/mocks/server.js`, though it is helpful to explore the rest of the
application and the tests got get a sense of how it should work and when the API
requests will be made.

It's helpful to explore the actual [SWAPI][swapi] API to get a feel for the
endpoints we're mocking. What data do we get from requests to these URLS?

- https://swapi.dev/api/people?search=skywalker
- https://swapi.dev/api/films/2

How can we ensure that our application can access this same data when testing?

If you're stuck, check out the solution branch of this repository to see how
this could be implemented.

## Resources

- [SWAPI][swapi]
- [`msw` REST API][msw rest]

[swapi]: https://swapi.dev/documentation
[msw rest]: https://mswjs.io/docs/api/rest
