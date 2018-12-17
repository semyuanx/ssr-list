const { sync } = require('lib-app-base/packages/sync-i18n');
const path = require('path');

sync({
  // 你的token信息
  token: 'CdSNbn2dv7iTnyrm',
  // 上传的项目名称
  projectName: 'ssr-rank-list',
  // 项目根目录
  projectRootDir: path.resolve(__dirname, './src/i18n'),
});
