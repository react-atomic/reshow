/**
 * https://babeljs.io/docs/en/assumptions#mutabletemplateobject
 *
 * https://github.com/babel/babel/pull/5791
 *
 * https://babeljs.io/docs/en/babel-plugin-transform-template-literals#loose
 * // babel.config.json
 * {
 *   "assumptions": {
 *       "mutableTemplateObject": true
 *    }
 *  }
 *
 */

const _taggedTemplateLiteralLoose = (strings, raw) => {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

export default _taggedTemplateLiteralLoose;
