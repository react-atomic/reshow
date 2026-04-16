import * as FS from "fs";
import fileExists from "./fileExists";

const isDir = (f: string): boolean => fileExists(f) && FS.lstatSync(f).isDirectory();

export default isDir;
