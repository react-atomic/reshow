import * as FS from "fs";

const fileExists = (f: string): boolean => FS.existsSync(f);

export default fileExists;
