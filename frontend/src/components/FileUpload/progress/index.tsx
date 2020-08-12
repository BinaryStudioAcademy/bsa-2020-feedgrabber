import React from "react";
import "./styles.sass";

const Progress = ({ progress }) => {
  return (
      <div className="ProgressBar">
        <div
            className="Progress"
            style={{ width:  progress + "%" }}
        />
      </div>
  );
};

export default Progress;
