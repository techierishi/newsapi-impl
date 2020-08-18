// Link.react.test.js
import React from "react";
import renderer from "react-test-renderer";
import Header from "../components/Header/Header";

test("Header snapshot test", () => {
  const component = renderer.create(<Header />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
