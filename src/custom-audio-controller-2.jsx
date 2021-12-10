import React from "react";
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

const StatusBar = ({ curTime, duration, onTimeUpdate }) => {
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
          background: `linear-gradient(to right, rgb(204, 159, 82) ${curPercentage}%, black 0)`,
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span className="bar__progress__knob" style={{ left: `${curPercentage - (16 / controllerWidth) * 90}%` }} />
      </div>
      <span className="bar__time">{formatDuration(duration)}</span>
    </div>
  );
};

const CustomAudioControllerC2 = ({ title, audio_url, clickPrev, clickNext }) => {
  const { curTime, duration, setPlaying, setClickedTime } = useAudioPlayer();

  const playClick = () => {
    setPlaying(true);
  };
  const pauseClick = () => {
    setPlaying(false);
  };

  return (
    <div className="custom-multi-audio-controller">
      <audio id="custom-multi-audio">
        <source src={audio_url} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <h3 className="custom-audio-label">Listen to the Podcast now!</h3>
      <h3 className="custom-audio-title">{title}</h3>
      <StatusBar curTime={curTime} duration={duration} onTimeUpdate={(t) => setClickedTime(t)} />
      <div className="controls">
        <div className="control-item" onClick={clickPrev.bind(this)}>
          <img src={moveLeftPng} alt="move-left" />
        </div>
        <div className="control-item" onClick={playClick.bind(this)}>
          <img src={playPng} alt="play" />
        </div>
        <div className="control-item" onClick={pauseClick.bind(this)}>
          <img src={pausePng} alt="pause" />
        </div>
        <div className="control-item" onClick={clickNext.bind(this)}>
          <img src={moveRightPng} alt="move-right" />
        </div>
      </div>
    </div>
  );
};

export default CustomAudioControllerC2;
