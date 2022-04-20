const FS = require("fs");
module.exports = (f) => FS.existsSync(f);
