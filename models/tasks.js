const Task = require("./task");
/**
 * {'uuid:{id:12, desc:gaa, completedIn:1212}'}
 */
class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTaskFromArr(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  listComplete() {
    console.log("");
    let data = this.listArr;
    data.forEach((element, index) => {
      const idx = `${index + 1}`.green;
      const { desc, completedIn } = element;
      const state = completedIn ? "Completed".green : "Pending".red;
      console.log(`${idx} ${desc} :: ${state}`);
    });
  }

  listCompletedPending(completed = true) {
    console.log("");
    let data = this.listArr;
    let count = 0;

    data.forEach((element) => {
      const { desc, completedIn } = element;
      const state = completedIn ? "Completed".green : "Pending".red;
      if (completed) {
        if (completedIn) {
          count++;
          console.log(
            `${count.toString().green + ".".green} ${desc} :: ${
              completedIn.green
            }`
          );
        }
      } else {
        if (!completedIn) {
          count++;
          console.log(
            `${count.toString().green + ".".green} ${desc} :: ${state}`
          );
        }
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedIn) {
        task.completedIn = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedIn = null;
      }
    });
  }
}
module.exports = Tasks;
