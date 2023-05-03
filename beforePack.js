const { writeFileSync } = require("fs");

exports.default = async function (context) {
  console.log("before pack");
  writeFileSync("./playground/index.html", "<h1>文件夹是空的，不会被打包，所以写入这个文件</h1>");
};
