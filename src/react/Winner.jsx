import React from "react";

/**
 * Winner Component
 * @param {*} props   Represents the properties that where passed to the component
 * @module ./react/Winner
 *
 * @returns           Returns the component that was rendered
 */
const Winner = (props) => {
  return (
    <div id="overlay">
      <h1>You Win!!!</h1>
      <h2>Score: {props.score}</h2>
    </div>
  );
};

export default Winner;
