// src/components/LoaderOverlay.jsx
import React from "react";
import ".././LoaderOverlay.css";

const LoaderOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default LoaderOverlay;
