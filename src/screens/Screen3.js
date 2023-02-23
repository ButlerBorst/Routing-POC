import React, { useEffect, useState } from "react";
import { useExperimentContext } from "../ExperimentProvider";

export default function Screen3(props) {
  const { experimentState, dispatchExperimentState } = useExperimentContext();
  return (
    <div className="instructions layout">
      <h1>{experimentState.item}</h1>
      <h2>INSTRUCTIONS</h2>
      <div>
        <h3>page type: VIEW</h3>
        <h1>Screen 3</h1>
      </div>
      <div>
        <button onClick={() => dispatchExperimentState({ type: "RETURN" })}>
          Return
        </button>
        <button onClick={() => dispatchExperimentState({ type: "PROCEED" })}>
          Proceed
        </button>
      </div>
    </div>
  );
}
