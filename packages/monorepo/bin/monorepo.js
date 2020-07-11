#!/usr/bin/env node

const commander = require('commander')
const cliPkg = require('../package.json')

commander
  .version(cliPkg.version)
  .command('build', 'Build packages')
  .command('clean', 'Clean directories')
  .command('docs', 'Publish docs')
  .command('examples', 'Publish examples')
  .command('version', 'Update packages version')
  .command('publish', 'Publish packages')
  .command('sync', 'Perform synchronisation on given type (repository, packages, examples, etc...)')
  .parse(process.argv)