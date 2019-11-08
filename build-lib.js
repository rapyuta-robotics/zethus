const rollup = require('rollup');
const localResolve = require('rollup-plugin-local-resolving');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const sass = require('rollup-plugin-sass');

const inputOptionsCommon = {
  plugins: [
    localResolve({
      extensions: ['.js', '.jsx'],
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react'],
    }),
    sass({
      insert: true,
    }),
    commonjs(),
  ],
  treeshake: true,
};

const inputOptionsZethus = {
  ...inputOptionsCommon,
  input: './src/zethus.jsx',
};

const inputOptionsPanels = {
  ...inputOptionsCommon,
  input: './src/panels/index.jsx',
};

const outputOptionsZethus = {
  format: 'umd',
  name: 'zethus',
  file: 'build-lib/zethus.umd.js',
  sourcemap: true,
};

const outputOptionsPanels = {
  format: 'umd',
  name: 'zethus',
  file: 'build-lib/panels.umd.js',
  sourcemap: true,
};

async function buildZethus() {
  const bundle = await rollup.rollup(inputOptionsZethus);
  await bundle.write(outputOptionsZethus);
}

async function buildPanels() {
  const bundle = await rollup.rollup(inputOptionsPanels);
  await bundle.write(outputOptionsPanels);
}

buildZethus().catch(console.error);
buildPanels().catch(console.error);
