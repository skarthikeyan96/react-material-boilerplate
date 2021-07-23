#! /usr/bin/env node

'use strict';


const {execSync} = require('child_process')

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
const gitCheckoutCommand = `git clone https://github.com/skarthikeyan96/react-material-boilerplate ${repoName}`
const installDepsCommand = `cd ${repoName} && yarn install`

console.log(`cloning the repository , ${repoName}`)

const checkedOut = runCommand(gitCheckoutCommand)

if(!checkedOut) process.exit(-1)

console.log("Installing the dependencies")
const installedDeps = runCommand(installDepsCommand)

if(!installDepsCommand) process.exit(-1)

console.log('Congratulations, You are ready')