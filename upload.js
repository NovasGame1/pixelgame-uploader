const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const exportFolder = "C:/Users/Isaac/PixelGameStudio/EXPORT";

// --- Step 1: Check if export folder exists ---
if (!fs.existsSync(exportFolder)) {
  console.error('❌ Export folder not found:', exportFolder);
  process.exit(1);
}

// --- Step 2: Get all .json files ---
const files = fs.readdirSync(exportFolder).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.log('⚠️ No .json files to upload. Export something first.');
  process.exit(0);
}

// --- Step 3: Copy files to current folder ---
files.forEach(file => {
  const from = path.join(exportFolder, file);
  const to = path.join(__dirname, file);
  fs.copyFileSync(from, to);
  console.log(`✅ Copied ${file} to repo folder`);
});

// --- Step 4: Initialize Git if needed ---
try {
  if (!fs.existsSync(path.join(__dirname, '.git'))) {
    console.log('🔁 No Git repo found. Initializing...');
    execSync('git init', { stdio: 'inherit' });
    execSync('git remote add origin https://github.com/NovasGame1/pixelgame-uploader.git', { stdio: 'inherit' });
    execSync('git pull origin main', { stdio: 'inherit' });
  }
} catch (err) {
  console.error('❌ Git setup failed:', err.message);
  process.exit(1);
}

// --- Step 5: Add, commit, push ---
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Upload from PixelGame Studio"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('🚀 Upload complete! Your game is live on GitHub Pages.');
} catch (err) {
  console.error('❌ Git error:', err.message);
  process.exit(1);
}
