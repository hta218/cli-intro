#!/usr/bin/env node

import { Command } from "commander";
import enquirer from "enquirer";

// Define the program
let program = new Command();
let prompt = enquirer.prompt;

function hello(name: string = "World") {
  console.log(`Hello, ${name}!`);
}

// Configure the program
program
  .name("Intro to CLI")
  .description("My first Nodejs x Typescript CLI program")
  .version("1.0.2");

// Add actions
program
  .argument("[name]", "The name to print")
  .option("-c, --capitalize", "Capitalize the name")
  .action(
    async (
      name: string,
      opts: {
        capitalize?: boolean;
      }
    ) => {
      if (!name) {
        let res = await prompt<{ name: string }>({
          type: "input",
          name: "name",
          message: "What is your name?",
        });
        name = res.name;
      }
      hello(opts.capitalize ? name.toUpperCase() : name);
    }
  );

// Add commands
program
  .command("add <numbers...>")
  .description("Add numbers and log the total")
  .action((numbers: number[]) => {
    let total = numbers.reduce((a, b) => a + Number(b), 0);
    console.log(`Total: ${total}`);
  });

program
  .command("get-max <numbers...>")
  .description("Get the max number in a list")
  .action((numbers: number[]) => {
    let max = Math.max(...numbers);
    console.log(`Max: ${max}`);
  });

program
  .command("get-min <numbers...>")
  .description("Get the min number in a list")
  .action((numbers: number[]) => {
    let min = Math.min(...numbers);
    console.log(`Min: ${min}`);
  });

// Execute the program with the arguments
program.parse(process.argv);
