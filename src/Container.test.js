import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Container from "./react-redux/Container";

test("rendered", () => {
  render(
    <Provider store={store}>
      <Container />
    </Provider>
  );
  expect(screen).toBeDefined();
});
