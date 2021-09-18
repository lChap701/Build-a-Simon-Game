import { createStore } from "redux";
import calculateScore from "./reducer";

/**
 * Redux store
 * @module ./redux/store
 * 
 */
export const store = createStore(calculateScore);
