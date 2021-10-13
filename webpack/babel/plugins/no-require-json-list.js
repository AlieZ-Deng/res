const chalk = require("chalk");
/**
 * 删除  的引入
 */
module.exports = function () {
  console.log(
    chalk.blue.bold(`
        --- --- ---

        no-require-json-list 执行
        
        --- --- ---
    `)
  );

  return {
    name: "no-require-json-list",
    visitor: {
      ImportDeclaration(path, state) {
        let importFile = path.node.source.value;
        if (importFile.indexOf("manifest.json") > -1) {
          path.remove();
        }
      },
    },
  };
};
