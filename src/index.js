import path from 'path';
import emoji from 'emoji.json';
import serveStatic from 'serve-static';

const name = 'EmojiOne';

function middleware() {
  const baseDir = path.join(__dirname, './emoji');
  return serveStatic(baseDir);
}

export {
  name,
  emoji,
  middleware,
};
