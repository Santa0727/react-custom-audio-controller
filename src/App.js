import React, { useState } from "react";
import CustomAudioControllerC2 from "./custom-audio-controller-2";

const audios = window.posts_audios;

function App() {
  const [curIdx, setCurIdx] = useState(0);
  const [curItem, setCurItem] = useState(audios[0]);

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

  return <CustomAudioControllerC2 title={curItem?.title} audioId={`custom_audio_item_${curItem.id}`} clickNext={clickNext} clickPrev={clickPrev} />;
}

export default App;
