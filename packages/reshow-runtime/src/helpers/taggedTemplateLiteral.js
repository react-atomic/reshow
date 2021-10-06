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

const _taggedTemplateLiteral = (strings, raw) => {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

export default _taggedTemplateLiteral;
