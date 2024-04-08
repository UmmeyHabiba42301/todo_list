#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todolist = [];
let conditions = true;
console.log(chalk.blue.bold("\n \t Wellcome to Habiba todolist application \n"));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: chalk.magentaBright("Select an option you want to do:"),
                choices: ["Add Task", "Delete Task", "Update Task", "view todolist", "Exit"]
            }]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "view todolist") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([{
            name: "task",
            type: "input",
            message: chalk.magentaBright("Enter your Task")
        }]);
    todolist.push(newTask.task);
    console.log(`\n ${newTask.task} task added successfully in todolist`);
};
let viewTask = () => {
    console.log("\n your todo list: \n");
    todolist.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log("\n");
};
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.magentaBright("Enter the 'index no' of the task you want to delete:"),
        }
    ]);
    let deleteTask = todolist.splice(taskIndex.index - 1, 1);
    console.log(chalk.redBright(`\n ${deleteTask} this task has been deleted successfully in todolist \n`));
};
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.magentaBright("Enter the 'index no' of the task you want to update:")
        },
        {
            name: "new_Task",
            type: "input",
            message: chalk.magentaBright("Now enter the new task:")
        }
    ]);
    todolist[update_task_index.index - 1] = update_task_index.new_task;
    console.log(chalk.greenBright(`\n Task at index no. ${update_task_index.index} updated successfully [for updated list  check option:"view todo list"]\n`));
};
main();
