import multer from 'multer';

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const sanitizedFilename = file.originalname.replace(/\s+/g, '-'); // Replace spaces with hyphens
      cb(null, `${Date.now()}-${sanitizedFilename}`); // Append timestamp for uniqueness
    },
  });  

const upload = multer({ storage: storage });

export default upload;
