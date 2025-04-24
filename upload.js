const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Folder where Unity exports JSON
const exportFolder = path.join(__dirname, '../Export');

// Read all .json files from the Export folder
const files = fs.readdirSync(exportFolder).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.log('❌ No game files found in Export folder.');
  process.exit();
}

files.forEach(file => {
  const src = path.join(exportFolder, file);
  const dest = path.join(__dirname, file);
  fs.copyFileSync(src, dest);
  console.log(`✅ Copied: ${file}`);
});

// Stage + Commit + Push
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "Auto-upload from PixelGame Studio"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  console.log('🚀 Upload complete!');
} catch (err) {
  console.error('❌ Upload failed:', err.message);
}
