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
    event?: string;
  }[] = [
    {
      key: "duration",
      event: "durationchange",
    },
    {
      key: "paused",
    },
    {
      key: "currentTime",
      event: "timeupdate",
    },
  ];

  Object.defineProperties(
    mediaElement,
    redefinedProperties.reduce((acc, cur) => {
      acc[cur.key] = {
        get() {
          return mediaProperties[cur.key];
        },
        set(newValue: MediaPropertiesValue) {
          mediaProperties[cur.key] = newValue;

          if (cur.event) {
            mediaElement.dispatchEvent(new CustomEvent(cur.event));
          }
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
  const timerIdRef = React.useRef<number>();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Hijact audio element
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      hijackMediaElement(audio);

      setTimeout(() => {
        (audio as any).duration = 100;
      }, 2000);
    }
  }, []);

  const playMockedMedia = () => {
    const audio = audioRef.current;

    if (audio) {
      if (audio.paused) {
        audio.play();
        timerIdRef.current = (setInterval(() => {
          audio.currentTime += 1;
        }, 1000) as unknown) as number;
      } else {
        audio.pause();
        clearInterval(timerIdRef.current);
      }
    }
  };

  const isReady = duration !== 0;

  return (
    <div>
      <h3>Media status: {`${isReady ? "READY" : "LOADING..."}`}</h3>
      <h3>{isReady ? `Duration: ${duration} seconds` : null}</h3>
      <button disabled={!isReady} onClick={playMockedMedia}>
        Toggle play/pause mocked media
      </button>
      <h3>Current time: {currentTime}</h3>
      <audio
        onDurationChange={(event) => {
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
