let createFile
let mkdir

// Detecting if platform is Windows, OSX, or Linux
// for creating files
switch (process.platform) {
    case 'darwin':
    case 'linux':
        createFile = 'touch '
        mkdir = 'mkdir -p '
        break
    case 'win32':
        createFile = 'echo.> '
        mkdir = 'mkdir '
        break
    default:
        throw new Error('Unsupported platform: ' + process.platform)
}

// stylesheet extensions
const styleExts = ['--scss', '--css', '--styl', '--less']

export {
    createFile,
    styleExts,
    mkdir
}
