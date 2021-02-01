import { useEffect, useState } from "react";
// import mp3 from "./assets/sample.mp3";

export default function App6() {
  const [src, setSrc] = useState(localStorage.getItem("src") as string);
  //   useEffect(() => {
  //     fetch("/sample.mp3")
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           setSrc(reader.result as string);
  //         };
  //         reader.readAsDataURL(blob);
  //       });
  //   }, []);

  //   localStorage.setItem("src", src);

  return (
    <div>
      <h1>Hello there</h1>
      <audio loop controls src={src} autoPlay />
      {/* <video controls src={src} /> */}
    </div>
  );
}
