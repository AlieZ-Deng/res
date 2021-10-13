const chalk = require("chalk");
/**
 * 删除 css 的引入
 */
module.exports = function () {
  console.log(
    chalk.blue.bold(`
        --- --- ---

        no-require-css 执行
        
        --- --- ---
    `)
  );

  return {
    name: "no-require-css",
    visitor: {
      ImportDeclaration(path, state) {
        let importFile = path.node.source.value;
        if (importFile.indexOf(".scss") > -1) {
          //如果引入了 css 需要干掉
          path.remove();
        }
      },
    },
  };
};
