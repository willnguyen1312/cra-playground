import React from "react";

const App = () => {
  const [counter, setCounter] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      (window as any).audio = audio;
      let duration = 10;
      Object.defineProperties(audio, {
        duration: {
          configurable: true,
          get() {
            return duration;
          },
          set(newDuration: number) {
            duration = newDuration;
          },
        },
      });
    }
  }, []);

  return (
    <div>
      <h1>World {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Click</button>
      <audio
        onLoadedMetadata={(event) => {
          console.log(event.currentTarget.duration);
        }}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          console.log(audio.currentTime);
        }}
        ref={audioRef}
        onProgress={(event) => {
          console.log();
        }}
      />
    </div>
  );
};

export default App;
