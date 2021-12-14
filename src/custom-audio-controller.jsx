import React, { useEffect, useState } from "react";
import playPng from "./play.png";
import pausePng from "./pause.png";
import nextPlayPng from "./next-player.png";
import prevPlayPng from "./prev-player.png";
import moveLeftPng from "./move-left.png";
import moveRightPng from "./move-right.png";
import togglePlayPng from "./toggle-play.png";
import stopPng from "./stop.png";
import useAudioPlayer from "./use-single-audio-player";

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
    const bar = document.querySelector(".bar__progress");
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
    <div className="bar">
      <span className="bar__time">{formatDuration(curTime)}</span>
      <div
        className="bar__progress"
        style={{
          background: audioState ? `linear-gradient(to right, rgb(204, 159, 82) ${curPercentage}%, black 0)` : "darkgray",
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span className="bar__progress__knob" style={{ left: `${curPercentage - (16 / controllerWidth) * 90}%` }} />
      </div>
      <span className="bar__time">{formatDuration(duration)}</span>
    </div>
  );
};

const CustomAudioController = () => {
  const [audioState, setAudioState] = useState(false);
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

  const moveLeft = () => {
    if (!audioState) {
      window.alert("Audio is unavailable");
    } else {
      setClickedTime(Math.max(0.1, curTime - 10));
    }
  };
  const moveRight = () => {
    if (!audioState) {
      window.alert("Audio is unavailable");
    } else {
      setClickedTime(Math.min(curTime + 10, duration));
    }
  };
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
  const stopClick = () => {
    if (!audioState) {
      window.alert("Audio is unavailable");
    } else {
      setClickedTime(0.1);
      setPlaying(false);
    }
  };
  const toggleClick = () => {
    if (!audioState) {
      window.alert("Audio is unavailable");
    } else {
      setPlaying(!playing);
    }
  };

  useEffect(() => {
    try {
      const audio = document.getElementById("custom-audio");
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
  }, []);

  return (
    <div className="custom-audio-controller">
      <audio id="custom-audio">
        <source src={window.custom_audio_link} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <StatusBar curTime={curTime} duration={duration} onTimeUpdate={(t) => setClickedTime(t)} audioState={audioState} />
      <div className="controls">
        <div className="control-item" onClick={moveLeft.bind(this)}>
          <img src={moveLeftPng} alt="move-left" />
        </div>
        <a href={window.custom_audio_prev_link} className="control-item">
          <img src={prevPlayPng} alt="prev-play" />
        </a>
        {playing ? (
          <div className="control-item" onClick={pauseClick.bind(this)}>
            <img src={pausePng} alt="pause" />
          </div>
        ) : (
          <div className="control-item" onClick={playClick.bind(this)}>
            <img src={playPng} alt="play" />
          </div>
        )}
        <div className="control-item" onClick={stopClick.bind(this)}>
          <img src={stopPng} alt="stop" />
        </div>
        <div className="control-item" onClick={moveRight.bind(this)}>
          <img src={moveRightPng} alt="move-right" />
        </div>
        <a href={window.custom_audio_next_link} className="control-item">
          <img src={nextPlayPng} alt="next-play" />
        </a>
        <div className="control-item" onClick={toggleClick.bind(this)}>
          <img src={togglePlayPng} alt="toggle-play" />
        </div>
      </div>
    </div>
  );
};

export default CustomAudioController;
