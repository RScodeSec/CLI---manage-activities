require("colors");

const showMenu = () => {
  return new Promise((resolve) => {
    console.log("=================================".green);
    console.log("  Choose the option to continue".green);
    console.log("=================================\n".green);

    console.log(`1.Create task`);
    console.log(`2.List task`);
    console.log(`3.List completed tasks`);
    console.log(`4.List pending tasks`);
    console.log(`5.Complete task(s)`);
    console.log(`6.Delete task`);
    console.log(`0.Exit\n`);
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readLine.question("Choose the option: ", (opt) => {
      readLine.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readLine.question(`\nPress ${"enter".red} to continue\n`, (opt) => {
      readLine.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
