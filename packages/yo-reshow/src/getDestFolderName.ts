import * as PATH from "path";

const getDestFolderName = (oGen: any): string => PATH.basename(oGen.destinationRoot());

export default getDestFolderName;
