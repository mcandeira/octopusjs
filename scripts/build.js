import esbuild from 'esbuild'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
const year = new Date().getFullYear()

const banner = `/**
 * OctopusJS | v${pkg.version} "Abyssal Octopus" 🐙 
 * ------------------------------------
 * ${pkg.description.replace('OctopusJS 🐙 | ', '')}
 * * @author ${pkg.author}
 * @license ${pkg.license}
 * @see {@link ${pkg.repository.url.replace('git+', '').replace('.git', '')}}
 * @release ${pkg.collaboration}
 * * Characteristics:
 * - 17kB footprint (~5.3kB Gzipped)
 * - 0.07s LCP | 0.02s CLS
 * - Native ESM Architecture
 * * Copyright (c) ${year} ${pkg.author}
 * * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * -----------------------------------------------------
 */`;

try {
  // 1. Empaquetamos e inyectamos el banner
  await esbuild.build({
    entryPoints: ['src/octopus.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: 'dist/octopus.min.js',
    format: 'esm',
    banner: { js: banner }
  });
  
  console.log('✅ Build completada con éxito.');
} catch (error) {
  console.error('❌ Error en la build:', error);
  process.exit(1);
}