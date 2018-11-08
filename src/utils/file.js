import fs from 'fs'
import { exec, execSync } from 'child_process'
import path from 'path'
import { log, green, yellow, red, blue } from './colors'
import { configFile } from '../constants/env_vars'
import { mkdir } from '../constants'

export const createDirectory = (component) => {
    try {
        execSync(mkdir + component)
    } catch (err) {
        log(yellow('ok'))
        log(yellow(err))
        log(red(`Error : Couldn't create ${component}, check permissions`))
    }
    log(green(`Info : Folders have been created`))
}

export const createFiles = (extensions, action, subDir, component, template, cb) => {
    extensions.forEach((ext) => {
        exec(action + subDir + component + ext, (err, stdout) => {
            if (err) {
                log('err mkdir')
                log(err.code)
                throw err
            }
            if (ext === '.js' || ext === '.jsx') {
                cb(subDir, component, ext, template)
            }
        })
    })
}

export const createFullComponent = (extensions, action, subDir, component, compTpl, stlCompTpl, cb) => {
    extensions.forEach((ext) => {

        let fileName
        let template
        if (ext === '.js') {
            fileName = 'index'
            template = compTpl
        } else if (ext === '.jsx') {
            fileName = component + 'Template'
            template = stlCompTpl
        } else {
            fileName = component
        }

        exec(action + subDir + fileName + ext, (err, stdout) => {
            if (err) {
                log(blue('ici'))
                log(yellow(err.code))
            }
            if (ext === '.js') {
                cb(subDir, fileName, ext, template)
            }
            if (ext === '.jsx') {
                cb(subDir, fileName, ext, template)
            }
        })
    })
}

export const writeToFile = (subDir, component, ext, compTmpl) => {
    fs.writeFile(subDir + component + ext, compTmpl, (err) => {
        if (err) {
            log(blue('la'))
            log(err)
        }
    })
}

export const createPjson = (action, subDir, template) => {
    exec(action + subDir + 'package.json', () => {
        fs.writeFile(subDir + 'package.json', template, (err) => {
            if (err) {
                throw err
            }
        })
    })
}

export const addCssExtension = (args, styleExts, extensions) => {
    for (let x = 0, len = args.length; x < len; x++) {
        if (styleExts.includes(args[x])) {
            extensions.push('.' + args[x].slice(2))
        }
    }
}
