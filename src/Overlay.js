import React, { useEffect, useState } from "react";

import "./styles.css";

export default function Overlay({ componentToOverlay }) {
  console.log("IN OVERLAY");
  return <div className="overlay-container">{componentToOverlay}</div>;
}
