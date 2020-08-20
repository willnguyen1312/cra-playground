import React from "react";

import { filter } from "ramda";

const App = () => {
  const filtered = filter((a) => a > 2, [1, 2, 3]);

  console.log(filtered);

  return <h1>Hello</h1>;
};

export default App;
