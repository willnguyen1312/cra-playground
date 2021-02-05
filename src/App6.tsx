import { useEffect, useState } from "react";

export default function App6() {
  const [src, setSrc] = useState(localStorage.getItem("src") as string);

  useEffect(() => {
    const socket = (window as any).io("http://localhost:3333");
    socket.on("connect", function () {
      console.log("Connected");

      socket.emit("events", { test: "test" });
      socket.emit("identity", 0, (response) =>
        console.log("Identity:", response)
      );
    });
    socket.on("events", function (data) {
      console.log("event", data);
    });
    socket.on("exception", function (data) {
      console.log("event", data);
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
  }, []);

  return (
    <div>
      <h1>Hello there</h1>
      <audio loop controls src={src} autoPlay />
      {/* <video controls src={src} /> */}
    </div>
  );
}
