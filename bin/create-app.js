#! /usr/bin/env node

'use strict';


const {execSync} = require('child_process')
const { unlinkSync, rmdirSync, existsSync } = require("fs");
const { join } = require('path')

const runCommand = command => {
    try {
        execSync(`${command}`,{stdio: 'inherit'})
    } catch (error) {
        console.error('Failed ',error)
        return false;
    }
    return true
}

const repoName = process.argv[2];

if(!repoName)
{
    // exit the process with error message
    console.error('Please add project name')
    process.exit('-1')
}

try {
  if (existsSync(repoName)) {
    console.log("project directory already exists. please enter new project name")
  } 
} catch(e) {
  console.log("An error occurred.", e)
}

const gitCheckoutCommand = `git clone https://github.com/skarthikeyan96/react-material-boilerplate ${repoName}`
const installDepsCommand = `yarn install`

const initWorkingDirectory = process.cwd();
const folderPath = join(initWorkingDirectory, repoName);


console.log(`cloning the repository , ${repoName}`)

const checkedOut = runCommand(gitCheckoutCommand)

if(!checkedOut) process.exit(-1)

// change to project directory
process.chdir(folderPath)

const installedDeps = runCommand(installDepsCommand)

if(!installedDeps) process.exit(-1)

/**
 * Delete the setup file and readme 
 */
unlinkSync(join(process.cwd(), "README.md"));
unlinkSync(join(process.cwd(), "bin", "create-app.js"));
rmdirSync(join(process.cwd(), "bin"));

runCommand(`git init`);
console.log(`new git repo initialized successfully!`);


console.log('Congratulations, You are ready')