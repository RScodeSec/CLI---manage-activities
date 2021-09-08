require("colors");
const { saveDB, readDB } = require("./db/saveFile");
const {
  inquirerMenu,
  pause,
  readInput,
  listTaskDelete,
  confirm,
  showListedCheckList,
} = require("./helpers/inquirer");

const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();
  const taskDB = readDB();

  if (taskDB) {
    tasks.loadTaskFromArr(taskDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await readInput("Description:");
        tasks.createTask(desc);
        break;
      case "2":
        //console.log(tasks.listArr);
        tasks.listComplete();
        break;
      case "3":
        tasks.listCompletedPending(true);
        break;
      case "4":
        tasks.listCompletedPending(false);
        break;
      case "5":
        const ids = await showListedCheckList(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
      case "6":
        const id = await listTaskDelete(tasks.listArr);

        if (id !== "0") {
          const ok = await confirm("Are you sure ?");
          if (ok) {
            tasks.deleteTask(id);
            console.log(`Task deleted`.yellow);
          }
          break;
        }
    }

    saveDB(tasks.listArr);

    await pause();
  } while (opt !== "0");
};
main();
