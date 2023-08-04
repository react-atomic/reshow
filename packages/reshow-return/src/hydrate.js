// @ts-check
import { hasWin, win } from "win-doc";

/**
 * @returns {boolean}
 */
const hydrate = () => {
  return !hasWin() || /**@type any*/ (win()).Reshow?.hydrate;
};

export default hydrate;
