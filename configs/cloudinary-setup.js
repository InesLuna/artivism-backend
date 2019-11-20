const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'avatar-gallery', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png', 'svg'],
  // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images
  discard_original_filename: true
});

const uploader = multer({ storage });
module.exports = uploader;