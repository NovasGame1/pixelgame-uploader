const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const uploadPath = path.join(__dirname, 'games');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

app.use('/games', express.static(uploadPath));

app.post('/upload', upload.single('game'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send('Upload successful: ' + req.file.originalname);
});

app.get('/', (req, res) => {
  res.send('PixelGame Upload Server is running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
