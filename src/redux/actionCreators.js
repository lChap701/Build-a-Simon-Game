import { ADD, SUBTRACT, RESET } from "./actionTypes";

/**
 * Add To Score Action Creators
 * @param {Number} score  Represents the points that should be added
 * @module ./redux/actionCreators
 *
 * @returns               Returns the action that was created
 */
const addToScore = (score) => {
  return { type: ADD, score: score };
};

/**
 * Subtract From Score Action Creators
 * @module ./redux/actionCreators
 *
 * @returns   Returns the action that was created
 */
const subtractFromScore = () => {
  return { type: SUBTRACT };
};

/**
 * Reset Score Action Creators
 * @module ./redux/actionCreators
 *
 * @returns   Returns the action that was created
 */
const resetScore = () => {
  return { type: RESET };
};

export { addToScore, subtractFromScore, resetScore };
