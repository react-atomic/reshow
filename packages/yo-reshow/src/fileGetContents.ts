import * as FS from "fs";
import isFile from "./isFile";

const fileGetContents = (f: string): string | false => isFile(f) && FS.readFileSync(f, "utf8");

export default fileGetContents;
