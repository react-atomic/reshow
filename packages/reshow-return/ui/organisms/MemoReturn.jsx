import { useMemo } from "react";
import build from "reshow-build";

const MemoReturn = (props) => {
  return useMemo(() => {
    return build(props.children)(props.props);
  }, [props.props]);
};

export default MemoReturn;
