import React from "react";

/**
 * Button Component
 * @param {*} props   Represents the properties that where passed to the component
 * @module ./react/Button
 *
 * @returns           Returns the component that was rendered
 */
const Button = (props) => {
  return (
    <button
      id={props.id}
      className={props.class}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <audio className="clip" src={props.audio}></audio>
    </button>
  );
};

export default Button;
