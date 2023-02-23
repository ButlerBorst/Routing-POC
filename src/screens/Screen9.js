import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScreenConfig } from "../Exp1Config";
import { useExperimentContext } from "../ExperimentProvider";

export default function Screen9(props) {
  const {
    experimentState,
    dispatchExperimentState,
    setValue,
    value,
    remove
  } = useExperimentContext();
  // const navigate = useNavigate();

  const startNextRound = () => {
    const firstRoute = ScreenConfig.screens.find((configScreen) => {
      return configScreen.firstRoute;
    });
    dispatchExperimentState({
      type: "FORCESCREENUPDATE",
      payload: firstRoute
    });
  };
  return (
    <div className="overlay-container layout">
      <h1>{experimentState.item}</h1>
      <h2>NEXT SEARCH ITEM</h2>
      <div>
        <h3>page type: OVERLAY</h3>
        <h1>Screen 9</h1>
      </div>

      <div>
        <button onClick={startNextRound}>START NEXT ROUND</button>
      </div>
    </div>
  );
}
