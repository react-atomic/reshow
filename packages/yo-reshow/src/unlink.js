const FS = require("fs");
module.exports = (f) => FS.unlinkSync(f);
