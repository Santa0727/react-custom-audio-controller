import React, { useEffect, useState } from "react";
import playPng from "./play.png";
import pausePng from "./pause.png";
import moveLeftPng from "./move-left.png";
import moveRightPng from "./move-right.png";
import useAudioPlayer from "./use-audio-player";

const controllerWidth = 600;

const formatDuration = (time) => {
  if (!time || time === undefined) return "00:00";
  const date = new Date(0);
  date.setSeconds(time);
  return date.toISOString().substring(14, 19);
};

const StatusBar = ({ curTime, duration, onTimeUpdate, audioState }) => {
  const curPercentage = (curTime / duration) * 100;

  const calcClickedTime = (e) => {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".multi-bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = Math.max(0, Math.min(barWidth, clickPositionInPage - barStart));

    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  };
  const handleTimeDrag = (e) => {
    if (!audioState) return;

    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  };

  return (
    <div className="multi-bar">
      <span className="multi-bar__time">{formatDuration(curTime)}</span>
      <div
        className="multi-bar__progress"
        style={{
          background: audioState ? `linear-gradient(to right, rgb(204, 159, 82) ${curPercentage}%, black 0)` : "darkgray",
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span className="multi-bar__progress__knob" style={{ left: `${curPercentage - (16 / controllerWidth) * 90}%` }} />
      </div>
      <span className="multi-bar__time">{formatDuration(duration)}</span>
    </div>
  );
};

const CustomAudioControllerC2 = ({ title, audioId, clickPrev, clickNext }) => {
  const [audioState, setAudioState] = useState(false);
  const { curTime, duration, setPlaying, setClickedTime } = useAudioPlayer(audioId);

  const playClick = () => {
    if (!audioState) {
      window.alert("Audio is unavailable");
    } else {
      setPlaying(true);
    }
  };
  const pauseClick = () => {
    if (!audioState) {
      window.alert("Audio is unavailable");
    } else {
      setPlaying(false);
    }
  };
  const updateTime = (t) => {
    if (!audioState) {
      window.alert("Audio is unavailable");
    } else {
      setClickedTime(t);
    }
  };

  useEffect(() => {
    const audio = document.getElementById(audioId);
    try {
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

    return () => {
      if (audio && audio !== undefined && audio.duration > 0) audio.pause();
    };
  }, [audioId]);

  return (
    <div className="custom-multi-audio-controller">
      <h3 className="custom-audio-label">Listen to the Podcast now!</h3>
      <h3 className="custom-audio-title">{title}</h3>
      <StatusBar curTime={curTime} duration={duration} onTimeUpdate={(t) => updateTime(t)} audioState={audioState} />
      <div className="multi-controls">
        <div className="multi-control-item" onClickCapture={clickPrev.bind(this)}>
          <img src={moveLeftPng} alt="move-left" />
        </div>
        <div className="multi-control-item" onClickCapture={playClick.bind(this)}>
          <img src={playPng} alt="play" />
        </div>
        <div className="multi-control-item" onClickCapture={pauseClick.bind(this)}>
          <img src={pausePng} alt="pause" />
        </div>
        <div className="multi-control-item" onClickCapture={clickNext.bind(this)}>
          <img src={moveRightPng} alt="move-right" />
        </div>
      </div>
    </div>
  );
};

export default CustomAudioControllerC2;
