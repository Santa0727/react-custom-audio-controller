import React, { useEffect, useState } from "react";
import CustomAudioControllerC2 from "./custom-audio-controller-2";

const audios = window.posts_audios;

function App() {
  const [curIdx, setCurIdx] = useState(0);
  const [curItem, setCurItem] = useState(audios[0]);
  const [audioState, setAudioState] = useState(false);

  const clickPrev = () => {
    const i = (curIdx + 1) % audios.length;
    setCurIdx(i);
    setCurItem(audios[i]);
  };
  const clickNext = () => {
    const i = (curIdx - 1 + audios.length) % audios.length;
    setCurIdx(i);
    setCurItem(audios[i]);
  };

  useEffect(() => {
    try {
      const audio = document.getElementById("custom-multi-audio");
      if (audio && audio !== undefined) {
        if (audio.duration > 0) audio.pause();
        audio.onloadeddata = () => {
          setAudioState(audio.networkState === 1 || audio.networkState === 2);
        };
        audio.load();
        setAudioState(false);
      } else {
        setAudioState(false);
      }
    } catch (error) {
      setAudioState(false);
    }
  }, [curItem]);

  return <CustomAudioControllerC2 title={curItem?.title} audio_url={curItem?.audio_url} clickNext={clickNext} clickPrev={clickPrev} audioState={audioState} />;
}

export default App;
