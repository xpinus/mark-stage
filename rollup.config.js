import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import alias from '@rollup/plugin-alias';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));

const OUPUT_DIR = 'dist';
const ENTRY_FILE_NAME = 'markstage';
const OUTPUT_FORAMT = ['cjs', 'esm', 'umd'];

function getOutputConfig() {
  return OUTPUT_FORAMT.map((format) => {
    return {
      dir: OUPUT_DIR,
      format,
      entryFileNames: ENTRY_FILE_NAME + '.' + format + '.js',
      name: 'markstage', // umd模块名称
      // sourcemap: false, // 是否输出sourcemap
      banner: `/**
 * @name ${packageJson.name}
 * @description ${packageJson.description}
 * @version ${packageJson.version}
 * @author ${packageJson.author} 
 * @repository ${packageJson.repository.url}
 * @license ${packageJson.license}
 */`,
    };
  });
}

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
    }),
    resolve(),
    commonjs(),
    terser({
      compress: {
        drop_console: ['log'],
      },
    }),
  ],
};
