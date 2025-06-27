const multer = require('multer');
const path = require('path');

// Helper to validate file types

const profileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } 
  else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const postFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } 
  else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

// Multer limits: file size (in bytes)
const MAX_PROFILE_IMAGE_SIZE = 20 * 1024 * 1024; // 20 MB
const MAX_POST_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

// Storage for profile pictures
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images/profile'),
  filename: (req, file, cb) => {
    const myfilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, myfilename);
  },
});

// Storage for post images/videos
const postStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images/posts'),
  filename: (req, file, cb) => {
    const myfilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, myfilename);
  },
});

// Multer upload instances
const uploadProfile = multer({
  storage: profileStorage,
  limits: { fileSize: MAX_PROFILE_IMAGE_SIZE },
  fileFilter: profileFilter,
});

const uploadPost = multer({
  storage: postStorage,
  limits: { fileSize: MAX_POST_FILE_SIZE },
  fileFilter: postFilter,
});

module.exports = {
  uploadProfile,
  uploadPost,
};
