// Compile the actual TSX components for Node's server-rendered regression tests.
// No browser globals or mock component implementations are installed.
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.tsx'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  });
  module._compile(outputText, filename);
};
const { createElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
exports.renderPage = page => {
  const name = page[0].toUpperCase() + page.slice(1) + 'Page';
  return renderToStaticMarkup(createElement(require(`../components/public-site/${page}-sections.tsx`)[name]));
};
