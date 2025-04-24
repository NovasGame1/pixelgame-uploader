const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Create folder if it doesn't exist
const uploadPath = path.join(__dirname, 'games');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Multer setup
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname); // use original name
  }
});
const upload = multer({ storage });

// Serve uploaded games
app.use('/games', express.static(uploadPath));

// Upload endpoint
app.post('/upload', upload.single('game'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send('Upload successful: ' + req.file.originalname);
});

// Health check
app.get('/', (req, res) => {
  res.send('PixelGame Upload Server is running ✅');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
