import React from "react";

const bar = props => {
  return (
    <div className="bar">
      <div style={{ width: props.width + "%" }} />
    </div>
  );
};

export default bar;
