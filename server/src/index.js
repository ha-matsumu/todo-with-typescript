const chalk = require("chalk");
const app = require("./server");
const port = 3000;

app.listen(port, () => {
  console.log("Todo app listening on port", chalk.green(port), "!");
});
