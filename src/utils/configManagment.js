import fs from 'fs'
import path from 'path'
import { configFile } from '../constants/env_vars'
import { log, green, yellow, red, magenta, blue } from '../utils/colors'
import { createDirectory } from './file'

// Check if config file exists
export const checkConfigFile = () => {
    try {
        fs.accessSync(configFile)
        log(green('Using ') + green.bold(configFile))
        log('')
        return true
    } catch (err) {
        log(yellow('Warning : ') + yellow.bold(configFile) + yellow(' file does not exist'))
        log(yellow('--------> Components will be created in current working directory'))
        log('')
        return false
    }
}

// Get matching path with given command option
export const getCmdOptionPath = (cmdOption) => {
    let configFolders = require(process.cwd() + '/' + configFile)
    return configFolders.filter(fold => {
        return fold.lib === cmdOption
    })[0].path
}

// Check if Directories defined by user in 'mkreactconfig.js' already exist
export const cmdOptionPathExists = (dirPath) => {
    const joinedPath = path.join(process.cwd(), dirPath)
    log(blue(`Info : Checking existance of "${dirPath}"`))
    try {
        fs.statSync(joinedPath)
    } catch (err) {
        if (err && err.code === 'ENOENT') {
            log(yellow('Info : "') + yellow(dirPath) + yellow(`" doesn't exist`))
            log(blue(`Info : Generating "${dirPath}" folders...`))
            try {
                createDirectory(joinedPath)
            } catch (err) {
                log('err catch 2')
            }
        } else {
            log('err catch 3')
            log(err);
            // just in case there was a different error:
            throw new Error(err)
        }

    }
}
