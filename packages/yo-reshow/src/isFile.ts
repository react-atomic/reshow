import fileExists from "./fileExists";
import isDir from "./isDir";

const isFile = (f: string): boolean => fileExists(f) && !isDir(f);

export default isFile;
