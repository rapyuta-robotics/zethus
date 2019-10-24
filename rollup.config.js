import localResolve from 'rollup-plugin-local-resolving';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: ['src/zethus.jsx', 'src/panels/index.jsx'],
  plugins: [
    localResolve({
      extensions: ['.js', '.jsx'],
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    sass({
      insert: true,
    }),
    commonjs(),
    multiEntry(),
  ],
  treeshake: true,
  output: [
    {
      format: 'umd',
      name: 'zethus',
      dir: 'dist',
      sourcemap: true,
    },
    {
      format: 'es',
      dir: 'dist',
    },
  ],
};
