// upload.js - Updated with correct export path to Unity's real folder
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// REAL export folder from Unity
const exportFolder = "C:/Users/Isaac/PixelGameStudio/EXPORT";

if (!fs.existsSync(exportFolder)) {
  console.error('❌ Export folder not found:', exportFolder);
  process.exit(1);
}

const files = fs.readdirSync(exportFolder).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.log('⚠️ No .json files to upload. Export something first.');
  process.exit(0);
}

files.forEach(file => {
  const from = path.join(exportFolder, file);
  const to = path.join(__dirname, file);
  fs.copyFileSync(from, to);
  console.log(`✅ Copied ${file} to GitHub folder`);
});

try {
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "Upload from PixelGame Studio"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  console.log('🚀 Upload complete! Files are live on GitHub Pages.');
} catch (err) {
  console.error('❌ Git error:', err.message);
} 
