#!/usr/bin/env node

import { Command } from "commander";

// Define the program
let program = new Command();

function hello(message: string = "World") {
  console.log(`Hello ${message}!`);
}

// Configure the program
program
  .name("My cli program")
  .description("My first Nodejs x Typescript CLI program")
  .version("1.0.0");

// Add commands
program
  .argument("<message>", "The message to print")
  .action((message: string) => {
    hello(message);
  });

// Execute the program with the arguments
program.parse(process.argv);
