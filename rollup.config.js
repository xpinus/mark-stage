import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUPUT_DIR = 'dist';
const ENTRY_FILE_NAME = 'markstage';
const OUTPUT_FORAMT = ['cjs', 'esm', 'umd'];

function getOutputConfig() {
  return OUTPUT_FORAMT.map((format) => {
    return {
      dir: OUPUT_DIR,
      format,
      entryFileNames: ENTRY_FILE_NAME + '.' + format + '.js',
      // file: `./dist/${format}/${ENTRY_FILE_NAME}.js`,
      name: 'markstage', // umd模块名称
      // sourcemap: false, // 是否输出sourcemap
    };
  });
}

const customResolver = resolve({
  extensions: ['.js', '.json', '.ts'],
});

export default {
  input: './src/index.ts',
  output: getOutputConfig(),
  plugins: [
    typescript({
      module: 'ESNext',
      tsconfig: './tsconfig.json',
    }),
    alias({
      entries: [
        { find: '@/', replacement: 'src/' }, // 将 @ 映射到 src 目录
      ],
      // customResolver,
    }),
    resolve(),
    commonjs(),
    // terser({
    //   compress: {
    //     drop_console: ['log'],
    //   },
    // }),
  ],
};
