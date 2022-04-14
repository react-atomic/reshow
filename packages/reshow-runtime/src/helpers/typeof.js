import { SYMBOL, OBJECT } from "reshow-constant";

import typeIs from "./getTypeOf.js";

const _typeof = (o) => (SYMBOL === typeIs(o) ? SYMBOL : typeIs(o, OBJECT));

export default _typeof;
