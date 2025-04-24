// upload.js - Includes auto git init + remote setup if needed
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Export path from Unity
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

// Ensure files are copied to repo
files.forEach(file => {
  const from = path.join(exportFolder, file);
  const to = path.join(__dirname, file);
  fs.copyFileSync(from, to);
  console.log(`✅ Copied ${file} to GitHub folder`);
});

try {
  // Check if inside a Git repo
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
  } catch {
    console.log('⚙️ Not a Git repo, initializing...');
    execSync('git init', { stdio: 'inherit' });
    execSync('git remote add origin https://github.com/NovasGame1/pixelgame-uploader.git', { stdio: 'inherit' });
    execSync('git pull origin main', { stdio: 'inherit' });
  }

  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Upload from PixelGame Studio"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('🚀 Upload complete to: https://github.com/NovasGame1/pixelgame-uploader/tree/main');
} catch (err) {
  console.error('❌ Git error:', err.message);
} 
