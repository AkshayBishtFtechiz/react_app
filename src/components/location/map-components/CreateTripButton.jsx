// CreateTripButton.jsx
import React from "react";

const CreateTripButton = ({ onClick }) => {
  return (
    <div>
      <button
        style={{
          height:"40px",
          zIndex: 2,
          position: "absolute",
          top: 11,
          left: 180,
          padding: ".65rem",
          marginLeft:"0px",
        }}
        onClick={onClick}
      >
        Create Trip
      </button>
    </div>
  );
};

export default CreateTripButton;
