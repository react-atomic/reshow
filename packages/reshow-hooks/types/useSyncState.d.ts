export default useSyncState;
declare function useSyncState(initState: any, setter?: typeof useState): ((nextState: any) => void)[];
import { useState } from "react";
