import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { useExperimentContext } from "./ExperimentProvider";
import Overlay from "./Overlay";
import { ScreenList } from "./screens/ScreenList";
import "./styles.css";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const { experimentState, remove } = useExperimentContext();

  const ScreenView =
    ScreenList[location?.state?.screen || experimentState?.screen?.screen];

  const OverlayView = ScreenList[experimentState?.screen?.screen];
  return (
    <div className="App">
      <div style={{ position: "absolute", top: "10%" }}>
        <button onClick={() => remove("routing-test")}>Remove storage</button>
      </div>
      <div className="mobile-container">
        {experimentState?.screen?.screenType === "overlay" && (
          <Overlay componentToOverlay={<OverlayView />} />
        )}
        <Routes>
          <Route path="/" element={<ScreenView />} />
        </Routes>
      </div>
    </div>
  );
}
