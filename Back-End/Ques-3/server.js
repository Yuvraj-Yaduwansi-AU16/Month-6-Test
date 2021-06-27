const upload = require('express-fileupload');
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 3000;

const uuid = require('uuid');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'djysy6iqo',
  api_key: '599715825531386',
  api_secret: 'A_8CJGM4yflJxFVArqK7w4fl2JY',
  secure: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());

// Route
app.use('/upload', (req, res) => {
  if (!req.files || !req.files.photo) {
    return res.status(400).json({
      success: false,
      msg: 'send a file with photo as the name',
    });
  }

  if (req.files.photo.size >= 5000000) {
    return res.status(400).json({
      success: false,
      msg: 'Size of file should be less than 5 MB',
    });
  }

  if (req.files.photo.mimetype.split('/')[0] !== 'image') {
    return res.status(400).json({
      success: false,
      msg: 'file type can only be image',
    });
  }

  const filePath = `./upload/${uuid.v4()}-${req.files.photo.name}`;

  req.files.photo.mv(filePath, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        msg: 'something went wrong',
      });
    }
  });

  cloudinary.uploader.upload(filePath, (error, result) => {
    return res.status(200).json({
      success: true,
      error,
      result,
    });
  });
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
