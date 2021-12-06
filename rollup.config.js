import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    preferConst: true,
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs({ ignoreDynamicRequires: true }),
    json(),
  ],
};
