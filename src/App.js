import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useExperimentContext } from "./ExperimentProvider";
import Overlay from "./Overlay";
import { ScreenList } from "./screens/ScreenList";
import "./styles.css";

export default function App() {
  const location = useLocation();

  const { experimentState } = useExperimentContext();
  console.log("experimentState", experimentState);
  //should be created dynamically from screen config

  //should be taken care of elsewhere?
  // const initPage = "PAGE2";

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (location.state !== initPage) {
  //     setCanDisplay(true);
  //     navigate("/", { state: initPage });
  //   }
  // }, []);

  const ScreenView =
    ScreenList[location?.state?.screen || experimentState?.screen?.screen];

  const OverlayView = ScreenList[experimentState?.screen?.screen];
  return (
    <div className="App">
      <div className="mobile-container">
        {experimentState?.screen?.screenType === "overlay" && (
          <Overlay componentToOverlay={<OverlayView />} />
        )}
        <Routes>
          <Route path="/" element={<ScreenView />} />
        </Routes>
        {/* {location.state ? (
          <Routes>
            <Route path="/" element={<ScreenView />} />
          </Routes>
        ) : (
          <ScreenView />
        )} */}
      </div>
    </div>
  );
}
