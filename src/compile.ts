#!/usr/bin/env node
import { execSync } from 'child_process'

import { safeExit } from './safeExit'
safeExit(() => {
  console.log(`Compile [${process.cwd()}]`)
  const imageExtList = ['gif', 'png', 'svg', 'jpg', 'jpeg', 'webp']
  execSync('yarn dlx rimraf dist', { stdio: 'inherit' })
  execSync('yarn dlx rollup -c rollup.config.js', { stdio: 'inherit' })
  execSync('yarn tsc -p tsconfig.build.json', { stdio: 'inherit' })
  imageExtList.forEach((ext) => {
    execSync(`yarn dlx copyfiles -u 1 "./src/**/*.${ext}" dist`, { stdio: 'inherit' })
  })
})
