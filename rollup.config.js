import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import strip from '@rollup/plugin-strip';

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
      sourcemap: true, // 是否输出sourcemap
    };
  });
}

export default {
  input: './src/index.ts',
  output: getOutputConfig(),
  plugins: [
    resolve(),
    commonjs(),
    strip({
      include: ['src/**/*.ts'],
    }), // 删除console
    typescript({ module: 'ESNext' }),
    terser(),
  ],
};
