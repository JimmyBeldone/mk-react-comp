<h1 align="center" style="border-bottom: none;">Make React Components</h1>
<h3 align="center">React CLI allowing you to create react components from the command line with lots of customizations. <a href="https://github.com/webpack-contrib/webpack-bundle-analyzer">webpack-bundle-analyser</a> to visualize size of output files with an interactive zoomable treemap.</h3>

<p align="center">
    <a href="https://travis-ci.com/JimmyBeldone/mk-react-comp">
        <img alt="travis build" src="https://travis-ci.com/JimmyBeldone/mk-react-comp.svg?branch=master">
    </a>
    <a href="https://www.npmjs.com/package/mk-react-comp">
        <img alt="npm version" src="https://badgen.net/npm/v/mk-react-comp">
    </a>
    <a href="#badge">
        <img alt="dependencies status" src="https://badgen.net/david/dep/JimmyBeldone/mk-react-comp">
    </a>
    <a href="#badge">
        <img alt="dev dependencies status" src="https://badgen.net/david/dev/JimmyBeldone/mk-react-comp">
    </a>
</p>
<p align="center">
    <a href="http://commitizen.github.io/cz-cli/">
        <img alt="commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
        <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
    </a>
    <a href="https://github.com/prettier/prettier">
        <img alt="prettier" src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg">
    </a>
    <a href="https://github.com/JimmyBeldone/mk-react-comp/blob/master/LICENSE">
        <img alt="license" src="https://badgen.net/github/license/JimmyBeldone/mk-react-comp">
    </a>
</p>

# Make React Components

## Installation

### Via Yarn (or NPM)

Make sure to install this module globally so you can run the command from anywhere.

```bash
yarn global add mk-react-comp
```

or

```bash
npm install -g mk-react-comp
```

## Usage

```bash
Usage:
    $ mkreact [action] <component(s) name(s)> [options]

Action:
    (optional) Actions can be defined in 'mkreactconfig.js' to choose path where components will be created

Options:
    -v, --version              Outputs the version number (e.g rc -v)
    -h, --help                 Prints out usage options
    -d, --dir                  Creates a [component name] directory with component file inside. (Default is only the component file)
    -p, --pkg                  Includes a package.json file with component
    --stateless, -s            Generates the stateless functional component. (Default is ES6 class).
    --jsx                      Creates the component with `.jsx` extenstion. (Default is `.js`)
    --entry                    Bootstraps the component with the 'ReactDOM.render' function.
    --css,--styl,--less, -scss Create and choose your css preprocessor to generate
    --full, -f                 Generate folder with a .js file for functional part, a .jsx file with stateless functional component as template, and a style file
    --lifecycle, -l            Include React lifecycle functions in template
    --redux, -r                Includes redux lib import and its functions
```

### mkreactconfig.js

This file must be in your app's root folder

You can use this file to define actions that will generate your components in provided path

```js
// Config File exemple
module.exports = [ {
      lib: 'containers',
      path: './src/views/containers/'
  },
  {
      lib: 'components',
      path: './src/views/components/'
  },
  {
      lib: 'pages',
      path: './src/views/pages/'
  },
  {
      lib: 'layouts',
      path: './src/views/layouts/'
  }
]
```

This way, you can now use *containers* as action :

```bash
mkreact containers Header,Footer -d --styl
```

will generate

```
root
 └-- src
    └-- views
       └-- containers
          └-- Header
              ├-- Header.js
              └-- Header.styl
          └-- Footer
              ├-- Footer.js
              └-- Footer.styl

```

## Examples

### Create `Home` component file that mounts to the DOM

```bash
mkreact Home --entry
```

will generate this `Home.js` file

```js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

export default class Home extends PureComponent {
    render() {
        return (
            <div className="home">

            </div>
        )
    }
}

ReactDOM.render(<Home/>, document.getElementById('app'))
```

### Create `Header` component folder with appropriate component files and a package.json

```bash
mkreact components Header -d --jsx -pkg --styl
```

will generate 3 files

```
└─ Header/
   ├─ Header.jsx         -> With ES6 Markup of a React component
   ├─ Header.styl        -> Stylus stylesheet
   └─ package.json       -> With name, main and version number markup included
```

## Contributing

Contributions are welcome ! See [contributing guidelines](https://github.com/JimmyBeldone/mk-react-comp/blob/master/CONTRIBUTING.md)

## License

MIT

Copyright (c) 2019 Jimmy Beldone
