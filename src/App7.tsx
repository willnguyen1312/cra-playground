import React from "react";

const App = () => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isLoadedMetadata, setIsLoadedMetadata] = React.useState(false);
  const timerIdRef = React.useRef<NodeJS.Timeout>();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Hijact audio element
  React.useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // We need to hijact any properties that are not modifiable from native media element
      // Duration is on of them
      // Properties like volume, currentTime, etc are modifiable
      // I don't have a complete list yet, sorry 😅
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

  // Dispatch audio event listeners
  React.useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      setTimeout(() => {
        // If we need to support IE, polyfill is very simple
        // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#polyfill
        audio.dispatchEvent(new CustomEvent("loadedmetadata"));
      }, 3000);
      // ☝️ We fake server response time here for loadedmetadata event
    }
  }, []);

  const togglePlayMockedMedia = () => {
    const audio = audioRef.current;

    if (audio) {
      timerIdRef.current = setInterval(() => {
        audio.currentTime += 1;
        audio.dispatchEvent(new CustomEvent("timeupdate"));
      }, 1000);
    }
  };

  return (
    <div>
      <h3>Media status: {`${isLoadedMetadata ? "READY" : "LOADING..."}`}</h3>
      <button disabled={!isLoadedMetadata} onClick={togglePlayMockedMedia}>
        Play mocked media
      </button>
      <h3>Current time: {currentTime}</h3>
      <audio
        onLoadedMetadata={() => {
          setIsLoadedMetadata(true);
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        ref={audioRef}
        controls
      />
    </div>
  );
};

export default App;
