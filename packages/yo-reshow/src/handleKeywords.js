const handleKeywords = (keyword, cb) => {
  const keywordArr = keyword?.split(",");
  if (keywordArr && keywordArr.length) {
    cb(keywordArr.map((s) => s.trim()));
  }
};

module.exports = handleKeywords;
