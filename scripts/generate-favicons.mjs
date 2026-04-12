import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, '../public/favicon.svg');
const publicDir = join(__dirname, '../public');

mkdirSync(publicDir, { recursive: true });

const svg = readFileSync(svgPath);

// Generate PNG sizes
const sizes = [
  { size: 16,  name: 'favicon-16x16.png' },
  { size: 32,  name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
];

for (const { size, name } of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(join(publicDir, name));
  console.log(`✓ ${name}`);
}

// Generate favicon.ico (16x16 + 32x32 embedded)
// Use the 32x32 PNG as base, sharp writes single-size ICO
const ico32 = await sharp(svg).resize(32, 32).png().toBuffer();
await sharp(ico32).toFile(join(publicDir, 'favicon.ico'));
console.log('✓ favicon.ico');

console.log('\nAll favicons generated.');
