import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import CustomAudioController from "./custom-audio-controller";

ReactDOM.render(
  <React.StrictMode>
    <CustomAudioController />
  </React.StrictMode>,
  document.getElementById("custom-multi-audio-controller-app")
);

reportWebVitals();
