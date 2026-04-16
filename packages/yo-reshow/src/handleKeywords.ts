const handleKeywords = (keyword: string | undefined, cb: (keywords: string[]) => void): void => {
  const keywordArr = keyword?.split(",");
  if (keywordArr && keywordArr.length) {
    cb(keywordArr.map((s) => s.trim()));
  }
};

export = handleKeywords;
