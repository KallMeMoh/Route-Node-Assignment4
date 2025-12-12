var longestCommonPrefix = function (strs) {
  let LCP = '';

  let shortest = strs[0].length;
  for (let str of strs) {
    if (str.length < shortest) shortest = str.length;
  }

  for (let i = 0; i < shortest; i++) {
    for (let str of strs) {
      if (strs[0][i] !== str[i]) return LCP;
    }
    LCP += strs[0][i];
  }

  return LCP;
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
