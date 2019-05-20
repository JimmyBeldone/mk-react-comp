#! /usr/bin/env node

import pjson from '../package.json';
import { log } from './utils/colors';

// eslint-disable-next-line import/no-extraneous-dependencies
const program = require('commander');

program
    .version(pjson.version, '-v, --version')
    .usage('[dirName] <component(s) name(s)> [options]')
    .description(
        `Generates React Components in specified folder
        (default: Current Directory) with customization options`,
    )
    .option('--jsx', 'Creates the component with `.jsx` extenstion. (Default is `.js`)')
    .option('--entry', "Bootstraps the component with the 'ReactDOM.render' function.")
    .option('--css', 'Generate CSS file with your component')
    .option('--styl', 'Generate Stylus file with your component')
    .option('--less', 'Generate Less file with your component')
    .option('--scss', 'Generate SCSS file with your component')
    .option(
        '-s, --stateless',
        'Generates the stateless functional component. (Default is ES6 class)',
    )
    .option('-d, --dir', 'Creates a [component name] directory with component file inside')
    .option(
        '-f, --full',
        `Generate folder with a .js file for functional part, a .jsx
        file with stateless functional component as template, and a style file`,
    )
    .option('-p, --pkg', 'Includes a package.json file with component')
    .option('-l, --lifecycle', 'Include React lifecycle functions in template')
    .option('-r, --redux', 'Includes redux lib import and its functions');

program.on('--help', () => {
    log('');
    log('  Examples:');
    log('');
    log('    $ mkreact containers Header,Nav,Footer --full --styl');
    log('    $ mkreact components Button --jsx --styl');
    log('    $ mkreact HomePage --entry');
    log('');
});

program.parse(process.argv);

require('./scripts/component');
