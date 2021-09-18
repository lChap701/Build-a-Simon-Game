import { ADD, SUBTRACT, RESET } from "./actionTypes";

/**
 * Redux reducer
 * @param {Number} state  Represents the current score/state
 * @param {*} action      Represents the action that should take place
 * @module ./redux/reducer
 *
 * @returns               Returns the current score
 */
const calculateScore = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return state + action.score;
    case SUBTRACT:
      return state - 1;
    case RESET:
      return 0;
    default:
      return state;
  }
};

export default calculateScore;
