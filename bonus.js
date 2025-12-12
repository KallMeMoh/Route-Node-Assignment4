var longestCommonPrefix = function (strs) {
  let LCP = '';

  for (let str in strs) {
    if (!str.startsWith(strs[0])) {
      strs[0].substr(0, str[0].length - 2);
    }
  }
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
