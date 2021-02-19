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
        controls
        // src="https://r3---sn-n5pbvoj5caxu8-8ube.googlevideo.com/videoplayback?expire=1613668510&ei=PkwuYPSNDorjqAHQmZWICw&ip=27.2.72.126&id=o-AEzdKXyqT9BmuGE1VgCE2pz5h0LT8EdX2Gtw9Cy1mJUN&itag=251&source=youtube&requiressl=yes&mh=mB&mm=31%2C29&mn=sn-n5pbvoj5caxu8-8ube%2Csn-42u-nboel&ms=au%2Crdu&mv=m&mvi=3&pl=24&initcwndbps=1226250&vprv=1&mime=audio%2Fwebm&ns=4zfY3ElX8_mgQpCZllpA2rsF&gir=yes&clen=263232224&dur=10923.441&lmt=1584451886184416&mt=1613646564&fvip=6&keepalive=yes&beids=23886204&c=WEB&txp=5531432&n=9oJKfeio_5Zz9NGh8&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAK6WC1BsWiI7IW5QO4xfZ6rndmyd6BRwvQbKe25U9tDIAiBheNyIu__B4mDNzwglVbO87nzKcjSTYzNjFBakTFm8tA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgZK9feitITYTUc9nxu-J21xvJcDRbOX8hERmFO1xE8cgCIFnDaUBsommgfcy7cyOkknrfO9Fl6YHDVZmLof09PTxq&ratebypass=yes"
      />
    </div>
  );
};

export default App;
