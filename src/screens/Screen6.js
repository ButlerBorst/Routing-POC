import React, { useEffect, useState } from "react";
import { useExperimentContext } from "../ExperimentProvider";

export default function Screen6(props) {
  const { experimentState, dispatchExperimentState } = useExperimentContext();
  return (
    <div className="layout route">
      <h1>{experimentState.item}</h1>
      <h2>PRODUCT SEARCH RESULTS SCREEN</h2>
      <div>
        <h3>page type: ROUTE</h3>
        <h1>Screen 6</h1>
      </div>

      <div>
        {/* <button onClick={() => dispatchExperimentState({ type: "RETURN" })}>
          Return
        </button> */}
        <button onClick={() => dispatchExperimentState({ type: "PROCEED" })}>
          CHOOSE PRODUCT
        </button>
      </div>
    </div>
  );
}
