import React from "react";
import Simon from "../react/Simon";
import { useSelector, useDispatch } from "react-redux";
import {
  addToScore,
  subtractFromScore,
  resetScore,
} from "../redux/actionCreators";

/**
 * Container Component for React-Redux
 * @module ./react-redux/Conatiner
 *
 * @returns   Returns the rendered component
 */
const Container = () => {
  const curScore = useSelector((state) => state);
  const dispatch = useDispatch();
  const onAdd = (score) => dispatch(addToScore(score));
  const onSubtract = () => dispatch(subtractFromScore());
  const onReset = () => dispatch(resetScore());

  return (
    <div id="container">
      <Simon
        score={curScore}
        addPoints={onAdd}
        dockPoints={onSubtract}
        clearPoints={onReset}
      />
    </div>
  );
};

export default Container;
