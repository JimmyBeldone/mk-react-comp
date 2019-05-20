import { withJSX } from '../constants/env_vars';

const args = process.argv.slice(2);
const component = args[1];
const extension = withJSX ? '.jsx' : '.js';

const template = `{
  "name": "${component}",
  "version": "0.0.0",
  "private": true,
  "main": "./${component}${extension}"
}`;

export default template;
