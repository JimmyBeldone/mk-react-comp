import path from 'path';
import { withJSX, withFolder, withFull, withPkg, isStateless } from '../constants/env_vars';
import { styleExts, createFile } from '../constants';

import { log, green, yellow, red, magenta } from '../utils/colors';
import {
    createDirectory,
    createFiles,
    writeToFile,
    createPjson,
    createFullComponent,
    addCssExtension,
} from '../utils/file';
import { primaryErrors, extraArgsErrors } from '../utils/errorsManagment';
import { checkConfigFile, getCmdOptionPath, cmdOptionPathExists } from '../utils/configManagment';

import compTpl from '../templates/component';
import stlCompTpl from '../templates/stlComponent';
import pjTmpl from '../templates/pjson';

// eslint-disable-next-line import/no-extraneous-dependencies
const program = require('commander');

// Check if primary errors
primaryErrors();
// Check if config file exists
const configFileExists = checkConfigFile();
// Get correct template
const template = isStateless ? stlCompTpl : compTpl;

const generateComponent = (components, extensions, finalPath) => {
    // Adding component file extension
    extensions.push(withJSX ? '.jsx' : '.js');
    let subDir = '';

    // Adding stylesheet extensions
    const args = process.argv.slice(2);
    addCssExtension(args, styleExts, extensions);

    components.forEach(component => {
        log('');
        log(`Generating ${magenta(component)} component...`);
        log(magenta(extensions));

        // Creating component folder
        if (withFolder || withFull) {
            const joinedPath = path.join(process.cwd(), finalPath, component);
            try {
                createDirectory(joinedPath);
            } catch (err) {
                log('err create dir');
            }
            subDir = `${joinedPath}/`;
        }

        if (withFull) {
            extensions.push('.jsx');
            try {
                createFullComponent(
                    extensions,
                    createFile,
                    subDir,
                    component,
                    compTpl(component),
                    stlCompTpl(component),
                    writeToFile,
                );
            } catch (err) {
                log(red('Error : Failed '));
            }
        } else {
            // Loop through to create necessary files
            createFiles(
                extensions,
                createFile,
                subDir,
                component,
                template(component),
                writeToFile,
            );
        }

        // Creating package.json pointing to component (via main) if needed
        if (withPkg) {
            createPjson(createFile, subDir, pjTmpl);
        }

        log(green.bold(component) + green(` have been created`));
    });
};

const extensions = [];
let finalPath = '';
let components;

if (configFileExists) {
    // Possibly missing argument
    if (program.args.length === 1) {
        log(
            `${yellow('Warning : Did you forget ') +
                yellow.bold('component path ') +
                yellow('or ') +
                yellow.bold('component Name')}?`,
        );
        components = program.args[0].split(',');
    } else {
        components = program.args[1].split(',');
        const cmdOption = program.args.shift();
        finalPath = getCmdOptionPath(cmdOption);
    }
    try {
        cmdOptionPathExists(finalPath);
    } catch (err) {
        log('err cmd option');
    }
    generateComponent(components, extensions, finalPath);
} else if (program.args.length > 1) {
    // Extra arguments errors
    extraArgsErrors();
} else {
    components = program.args[0].split(',');
    generateComponent(components, extensions, finalPath);
}
