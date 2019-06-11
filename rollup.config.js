import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import isBuiltinModule from 'is-builtin-module';
import emoji from './build/emoji.js';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

const emojiBaseDir = path.join(
  path.dirname(require.resolve('emojione-assets/emoji.json')),
  './png/64'
);

export default {
  input: 'src/index.js',
  output: [{
    file: pkg.main,
    exports: 'named',
    format: 'cjs',
    sourcemap: true,
  }, {
    file: pkg.module,
    format: 'es',
    sourcemap: true,
  }],
  external: id => isBuiltinModule(id) || external.some(m => id.split('/')[0] === m),
  plugins: [
    nodeResolve(),
    emoji('emoji.json'),
    copy({
      targets: [
        {
          src: path.join(emojiBaseDir, '*'),
          dest: path.join(__dirname, path.dirname(pkg.main), './emoji'),
        },
      ],
    }),
  ],
};
