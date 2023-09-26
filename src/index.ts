#!/usr/bin/env node

import { Command } from "commander";
import enquirer from "enquirer";

// Define the program
let program = new Command();
let prompt = enquirer.prompt;

function hello(name: string = "World", age?: number) {
  console.log(`Hello, ${name}!`);
  if (age) {
    console.log(`You are ${age} years old!`);
  }
}

// Configure the program
program
  .name("Intro to CLI")
  .description("My first Nodejs x Typescript CLI program")
  .version("1.0.6");

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
      let age: number = 0;
      if (!name) {
        let res = await prompt<{ name: string; yob: number }>([
          {
            type: "input",
            name: "name",
            message: "What is your name?",
          },
          {
            type: "numeral",
            name: "yob",
            message: "When were you born?",
          },
        ]);
        name = res.name;
        age = new Date().getFullYear() - res.yob;
      }
      hello(opts.capitalize ? name.toUpperCase() : name, age);
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
