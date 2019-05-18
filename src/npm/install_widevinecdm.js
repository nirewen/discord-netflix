var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')
var os = require('os')

// npm binary based on OS
var npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'

// install folder
cp.spawn(npmCmd, ['i'], { env: process.env, cwd: "./electron-widevinecdm", stdio: 'inherit' })