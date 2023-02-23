import React, { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import { useExperimentContext } from "../ExperimentProvider";

export default function Screen4(props) {
  const {
    experimentState,
    dispatchExperimentState,
    setValue
  } = useExperimentContext();
  const [display, setDisplay] = useState("none");

  useEffectOnce(() => {
    setDisplay("flex");
  });

  const proceedWithNext = () => {
    const currentItem = experimentState.items.indexOf(experimentState.item);
    setValue(experimentState.items[currentItem + 1]);
    dispatchExperimentState({ type: "STARTNEXTROUND" });
  };
  return (
    <div style={{ display: display }} className="layout route">
      <h1>{experimentState.item}</h1>
      <h2>PROCEED WITHOUT SELECTION</h2>
      <div>
        <h3>page type: ROUTE</h3>
        <h1>Screen 4</h1>
      </div>

      <div>
        <button onClick={proceedWithNext}>Next Product</button>
        <button onClick={() => dispatchExperimentState({ type: "PROCEED" })}>
          Proceed
        </button>
      </div>
    </div>
  );
}
