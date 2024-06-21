// eslint-disable-next-line import/no-extraneous-dependencies
import * as esbuild from 'esbuild';

// entryPoints: ['pages/**/*.js', 'pages/**/*.jsx', 'pages/**/*.tsx'],

async function runBuild() {
  const examplePlugin = {
    name: 'example',
    setup(build) {
      build.onStart(() => {
        console.time('build_time');
      })

      build.onEnd((result) => {
        console.timeEnd('build_time');
        console.log(`build ended with ${result.errors.length} errors`)
      })
    },
  }

  try {
    await esbuild.build({
      entryPoints: ['pages/**/*.tsx'],
      bundle: true,
      minify: true,
      sourcemap: false,
      outdir: 'esbuild_output',
      plugins: [examplePlugin],
      loader: {
        '.js': 'jsx',
        '.ts': 'ts',
        '.tsx': 'tsx',
        '.ico': 'file',
        '.svg': 'file',
        '.png': 'file',
      },
      target: 'esnext',
      external: ['path'],
      tsconfig: './tsconfig.json',
    });
    console.log('success');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

runBuild();
