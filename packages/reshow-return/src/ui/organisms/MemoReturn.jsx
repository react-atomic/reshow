import { useMemo } from "react";
import build from "reshow-build";

const MemoReturn = (props) =>
  useMemo(
    () => build(props.children)(props.actualProps || props.props),
    [props.props]
  );

export default MemoReturn;
