import React, { useState } from "react";

import faker from "faker";

const generateImages = (number = 5) =>
  Array.from({ length: number }).map(() => faker.image.avatar());

const App = () => {
  const [images, setImages] = useState<string[]>(() => generateImages());

  return (
    <div>
      <div>
        <span>h</span>
        <span>e</span>
        <span>l</span>
        <span>l</span>
      </div>
      <button onClick={() => setImages(generateImages())}>
        Randomize images
      </button>
      <h1>Images</h1>
      {images.map((image, index) => (
        <img width={100} height={100} key={index} src={image} alt="random" />
      ))}
    </div>
  );
};

export default App;
