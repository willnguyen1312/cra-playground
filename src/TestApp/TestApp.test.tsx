// app.test.js
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { LocationDisplay, App } from "./TestApp";

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  const { container, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(container.innerHTML).toMatch("You are home");

  fireEvent.click(getByText(/about/i));

  // check that the content changed to the new page
  expect(container.innerHTML).toMatch("You are on the about page");
});

test("landing on a bad page shows 404 page", () => {
  const _history = createMemoryHistory();
  _history.push("/some/bad/route/ahaha");
  const stuff = {
    ...render(
      <Router history={_history}>
        <App />
      </Router>
    ),
    history: _history,
  };

  const { getByRole, history } = stuff;
  expect(getByRole("heading")).toHaveTextContent("404 Not Found");
});

test("rendering a component that uses withRouter", () => {
  const history = createMemoryHistory();
  const route = "/some-route";
  history.push(route);
  const { getByTestId } = render(
    <Router history={history}>
      <LocationDisplay />
    </Router>
  );
  expect(getByTestId("location-display")).toHaveTextContent(route);
});
