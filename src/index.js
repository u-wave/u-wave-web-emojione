import path from 'path';
import emoji from 'emoji.json';
import serveStatic from 'serve-static';

function middleware() {
  const baseDir = path.join(__dirname, './emoji');
  return serveStatic(baseDir);
}

export {
  emoji,
  middleware,
};
