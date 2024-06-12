import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const ENTRY_FILE_NAME = 'markstage';

export default {
  input: './src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: ENTRY_FILE_NAME + '.cjs.js',
      sourcemap: false, // 是否输出sourcemap
      plugins: [terser()],
    },
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: ENTRY_FILE_NAME + '.esm.js',
      sourcemap: false,
      plugins: [terser()],
    },
    {
      dir: 'dist',
      format: 'umd',
      entryFileNames: ENTRY_FILE_NAME + '.umd.js',
      name: 'markstage', // umd模块名称
      sourcemap: false,
      plugins: [terser()],
    },
  ],
  plugins: [resolve(), commonjs(), typescript({ module: 'ESNext' })],
};
