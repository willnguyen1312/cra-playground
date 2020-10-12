import React from "react";

const App = () => {
  const [imageSrc, setImageSrc] = React.useState<string>("");
  const handleClick = async () => {
    const response = await fetch("https://source.unsplash.com/random");
    const contentType = response.headers.get("content-type");
    const isImage = contentType?.includes("image");

    if (isImage) {
      const data = await response.blob();
      console.log(data instanceof Blob);

      const objectURL = URL.createObjectURL(data);
      setImageSrc(objectURL);
    }
  };
  return (
    <div>
      <img alt="Ohoh" src={imageSrc} />

      <button onClick={handleClick}>Get Image</button>
    </div>
  );
};

export default App;
