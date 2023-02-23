import React, { useEffect, useState } from "react";
import { ScreenConfig } from "../Exp1Config";
import { useExperimentContext } from "../ExperimentProvider";

export default function Screen8(props) {
  const {
    experimentState,
    dispatchExperimentState,
    remove,
    setValue,
    value
  } = useExperimentContext();

  const finishCurrentRound = () => {
    if (value === "LASTITEM") {
      remove("routing-test");
    } else {
      const currentItem = experimentState.items.indexOf(experimentState.item);
      setValue(experimentState.items[currentItem + 1]);
      dispatchExperimentState({ type: "STARTNEXTROUND" });
    }
  };
  return (
    <div className="overlay-container layout">
      <h1>{experimentState.item}</h1>
      <h2>HAPPY WITH SELECTION</h2>
      <div>
        <h3>page type: OVERLAY</h3>
        <h1>Screen 8</h1>
      </div>

      <div>
        <button onClick={finishCurrentRound}>ADD TO CART FINAL</button>
      </div>
    </div>
  );
}
