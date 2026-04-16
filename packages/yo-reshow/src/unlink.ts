import * as FS from "fs";

const unlink = (f: string): void => FS.unlinkSync(f);

export default unlink;
