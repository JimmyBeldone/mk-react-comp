
import { log, green, yellow, red, magenta, blue } from '../utils/colors'
const program = require('commander')

export const primaryErrors = () => {
    // If no arguments or too many
    if (program.args.length === 0) {
        log(red.bold('Error : ') + red('You need to specify a ') + yellow.bold('name ') + red('for your component(s)'))
        log('')
        log(magenta('Exit process'))
        process.exit()
    } else if (program.args.length > 2) {
        log(red.bold('Error : Extra arguments'))
        log(red('------> Maybe you forgot commas between components names'))
        log(magenta('Exit process'))
        process.exit()
    }
}

export const extraArgsErrors = () => {
    const regex = /,$/
    let hasSpaces = 0
    program.args.forEach(arg => {
        if (regex.test(arg)) hasSpaces++
    })
    if (hasSpaces > 0) {
        log(red.bold('Error : ') + red('There should be ') + red.bold('no spaces after comma(s) ') + red('between components Names'))
        log('')
        log(magenta('Exit process'))
    } else {
        log(red.bold('Error : Extra arguments'))
        log(red('------> Maybe you forgot commas between components names'))
        log('')
        log(magenta('Exit process'))
    }
    process.exit()
}
