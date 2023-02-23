import React, { useEffect, useState } from "react";
import { useExperimentContext } from "../ExperimentProvider";

export default function Screen1(props) {
  const { experimentState, dispatchExperimentState } = useExperimentContext();
  return (
    <div className="instructions layout">
      <h1>INSTRUCTIONS</h1>
      <div>
        <h3>page type: VIEW</h3>
        <h1>Screen 1</h1>
      </div>

      <div>
        <button onClick={() => dispatchExperimentState({ type: "PROCEED" })}>
          Proceed
        </button>
      </div>
    </div>
  );
}
