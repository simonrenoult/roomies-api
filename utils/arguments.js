var app = require('commander');
var packageConf = require('../package.json');

app
  .version(packageConf.version)
  .option('-D, --development', 'Set environment as development (default)')
  .option('-T, --test', 'Set environment as test')
  .parse(process.argv);

if(!(app.development && app.test)) {
  app.development = true;
}

module.exports = app;
