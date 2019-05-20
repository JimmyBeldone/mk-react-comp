let cf;
let dir;

// Detecting if platform is Windows, OSX, or Linux
// for creating files
switch (process.platform) {
    case 'darwin':
    case 'linux':
        cf = 'touch ';
        dir = 'mkdir -p ';
        break;
    case 'win32':
        cf = 'echo.> ';
        dir = 'mkdir ';
        break;
    default:
        throw new Error(`Unsupported platform: ${process.platform}`);
}

// stylesheet extensions
const styleExts = ['--scss', '--css', '--styl', '--less'];

const createFile = cf;
const mkdir = dir;

export { createFile, styleExts, mkdir };
