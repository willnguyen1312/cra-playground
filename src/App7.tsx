import React from "react";

type MediaPropertiesValue = number | string | boolean;

const hijackMediaElement = (
  mediaElement: HTMLAudioElement | HTMLVideoElement
) => {
  const mediaProperties: Record<
    "duration" | "paused" | "currentTime",
    MediaPropertiesValue
  > = {
    duration: 0,
    paused: true,
    currentTime: 0,
  };

  const redefinedProperties: {
    key: keyof typeof mediaProperties;
    value: MediaPropertiesValue;
    event: string;
  }[] = [
    {
      key: "duration",
      value: mediaProperties.duration,
      event: "durationchange",
    },
    {
      key: "paused",
      value: mediaProperties.paused,
      event: "durationchange",
    },
    {
      key: "currentTime",
      value: mediaProperties.currentTime,
      event: "timeupdate",
    },
  ];

  Object.defineProperties(
    mediaElement,
    redefinedProperties.reduce((acc, cur) => {
      acc[cur.key] = {
        get() {
          return cur.value;
        },
        set(newValue: MediaPropertiesValue) {
          cur.value = newValue;
          mediaElement.dispatchEvent(new CustomEvent(cur.event));
        },
      };
      return acc;
    }, {})
  );

  Object.assign(mediaElement, {
    play: () => {
      mediaProperties.paused = false;
      mediaElement.dispatchEvent(new CustomEvent("play"));
    },
    pause: () => {
      mediaProperties.paused = true;
      mediaElement.dispatchEvent(new CustomEvent("pause"));
    },
  });
};

const App = () => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isLoadedMetadata, setIsLoadedMetadata] = React.useState(false);
  const timerIdRef = React.useRef<NodeJS.Timeout>();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Hijact audio element
  React.useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // We need to hijact any properties that are not modifiable (AKA readonly) from native media element
      // Duration is on of them
      // Properties like volume, currentTime, etc are modifiable
      // Here is the list - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#properties 😎
      let duration = 100;
      let paused = true;
      Object.defineProperties(audio, {
        duration: {
          get() {
            return duration;
          },
          set(newDuration: number) {
            duration = newDuration;
          },
        },
        paused: {
          get() {
            return paused;
          },
        },
      });

      Object.assign(audio, {
        play: () => {
          paused = false;
          audio.dispatchEvent(new CustomEvent("play"));
        },
        pause: () => {
          paused = true;
          audio.dispatchEvent(new CustomEvent("pause"));
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

  const playMockedMedia = () => {
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
      <h3>{isLoadedMetadata ? `Duration: ${duration} seconds` : null}</h3>
      <button disabled={!isLoadedMetadata} onClick={playMockedMedia}>
        Toggle play/pause mocked media
      </button>
      <h3>Current time: {currentTime}</h3>
      <audio
        onPlay={(event) => {
          console.log(event.currentTarget.paused);
        }}
        onPause={(event) => {
          console.log(event.currentTarget.paused);
        }}
        onLoadedMetadata={(event) => {
          setIsLoadedMetadata(true);
          setDuration(event.currentTarget.duration);
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
