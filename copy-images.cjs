const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'apps', 'web', 'public', 'images');
fs.mkdirSync(targetDir, { recursive: true });

const brainDir = 'C:\\Users\\sivaporn\\.gemini\\antigravity-ide\\brain\\033fa631-d2cd-454d-a6cf-cf625bda0fce';

const mappings = [
  { src: 'safefu_hero_bar_1790568293802.jpg', dest: 'hero-bar.jpg' },
  { src: 'safefu_bridge_set_1790568314726.jpg', dest: 'bridge-set.jpg' },
  { src: 'safefu_matcha_desserts_1790568337061.jpg', dest: 'matcha-desserts.jpg' },
  { src: 'safefu_ceremonial_matcha_1790568359661.jpg', dest: 'ceremonial-matcha.jpg' },
  { src: 'safefu_marbling_art_1790568408905.jpg', dest: 'marbling-art.jpg' }
];

for (const m of mappings) {
  const srcPath = path.join(brainDir, m.src);
  const destPath = path.join(targetDir, m.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${m.src} -> ${m.dest}`);
  } else {
    console.error(`File not found: ${srcPath}`);
  }
}
