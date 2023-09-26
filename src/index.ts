#!/usr/bin/env node

import { Command } from "commander";

// Define the program
let program = new Command();

function hello(name: string) {
  console.log(`Hello ${name}!`);
}

// Configure the program
program
  .name("My cli program")
  .description("My first Nodejs x Typescript CLI program")
  .version("1.0.0");

// Add actions
program
  .argument("<name>", "The name to print")
  .option("-c, --capitalize", "Capitalize the name")
  .action(
    (
      name: string,
      opts: {
        capitalize?: boolean;
      }
    ) => {
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
  .description("Get the max number")
  .action((numbers: number[]) => {
    let max = Math.max(...numbers);
    console.log(`Max: ${max}`);
  });

// Execute the program with the arguments
program.parse(process.argv);
