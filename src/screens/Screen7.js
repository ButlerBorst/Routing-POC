import React, { useEffect, useState } from "react";
import { useExperimentContext } from "../ExperimentProvider";

export default function Screen7(props) {
  const { experimentState, dispatchExperimentState } = useExperimentContext();
  return (
    <div className="layout route">
      <h1>{experimentState.item}</h1>
      <h2>PRODUCT DETAILS SCREEN</h2>
      <div>
        <h3>page type: ROUTE</h3>
        <h1>Screen 7</h1>
      </div>

      <div>
        <button onClick={() => dispatchExperimentState({ type: "RETURN" })}>
          KEEP SHOPPING
        </button>
        <button onClick={() => dispatchExperimentState({ type: "PROCEED" })}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
