const chalk = require('chalk');
const error = (message) => {
  process.stdout.write(chalk.red(message));
};
const chalkLog = (message) => {
  process.stdout.write(chalk.magentaBright(message));
};
const success = (message) => {
  process.stdout.write(chalk.white.yellow.bold(message));
};

module.exports = {
  error,
  chalkLog,
  success,
};
