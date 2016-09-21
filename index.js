const path = require('path');
const emoji = require('./emoji.json');
const serveStatic = require('serve-static');

function middleware() {
  const baseDir = path.join(__dirname, './emoji');
  return serveStatic(baseDir);
}

module.exports = {
  emoji: emoji,
  middleware: middleware,
};
