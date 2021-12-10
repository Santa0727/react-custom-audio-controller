import React, { useState } from "react";
import "./App.css";
import CustomAudioControllerC2 from "./custom-audio-controller-2";

const audios = window.posts_audios;

function App() {
  const [curIdx, setCurIdx] = useState(0);
  const [curItem, setCurItem] = useState(audios[0]);

  const clickPrev = () => {
    document.getElementById("custom-multi-audio").load();
    const i = (curIdx + 1) % audios.length;
    setCurIdx(i);
    setCurItem(audios[i]);
  };
  const clickNext = () => {
    document.getElementById("custom-multi-audio").load();
    const i = (curIdx - 1 + audios.length) % audios.length;
    setCurIdx(i);
    setCurItem(audios[i]);
  };

  return <CustomAudioControllerC2 title={curItem?.title} audio_url={curItem?.audio_url} clickNext={clickNext} clickPrev={clickPrev} />;
}

export default App;
