#! /usr/bin/env node

const { exec } = require('child_process')
const { unlinkSync, rmdirSync, existsSync } = require('fs')
const { join } = require('path')
/**
 * Takes a function following the common error-first callback style, i.e. taking a (err, value) => ... callback as the last argument, and returns a version that returns promises.
 */
const { promisify } = require('util')

const folderName = process.argv[2] || 'react-material-starter'
const repoName = `https://github.com/skarthikeyan96/react-material-boilerplate `

const gitCheckoutCommand = `git clone --depth 1 ${repoName} ${folderName}`
const installDepsCommand = `yarn install`
const removeGitFolder = `npx rimraf ./.git`
const reinitalizeGit = `git init && git checkout -b main && git add . && git commit -am "initial commit"`

const workingDirectory = process.cwd()
const folderPath = join(workingDirectory, folderName)

// convert callback based exec to a promise
const execPromise = promisify(exec)

const runCommand = async (command) => {
  try {
    const { stdout, stderr } = await execPromise(command)
    console.log(stdout)
    console.log(stderr)
  } catch (err) {
    console.log('error occured while executing the command 🚨 ', err)
  }
}

try {
  if (existsSync(folderName)) {
    console.log(`${folderName} already exists. please enter new project name`)
    console.log('==================')
    console.log('Format :  npx react-material-starter <Project Name> ')
    return
  }
} catch (e) {
  console.log('An error occurred.', e)
}

;(async () => {
  try {
    // clone the repository
    await runCommand(gitCheckoutCommand)
    console.log('cloning complete...')

    process.chdir(folderPath)
    console.log('changing the directory and removing the lock file...')

    unlinkSync(join(process.cwd(), 'yarn.lock'))

    console.log(`installing dependencies, please wait...`)
    await runCommand(installDepsCommand)
    console.log(`dependencies installed successfully!`)

    await runCommand(removeGitFolder)
    console.log(`old .git folder deleted successfully!`)

    unlinkSync(join(process.cwd(), 'README.md'))
    unlinkSync(join(process.cwd(), 'bin', 'create-app.js'))
    rmdirSync(join(process.cwd(), 'bin'))

    await runCommand(reinitalizeGit)
    console.log(`new git repo initialized successfully!`)

    console.log('Starter is ready, Happy Hacking 🎉🎉🎉')
  } catch (err) {
    console.log(err)
  }
})()
