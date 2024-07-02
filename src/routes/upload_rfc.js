// src/routes/upload_rfc.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const rfc = req.body.rfc;
    const extension = '.webp';
    cb(null, `${rfc}${extension}`);
  }
});

const upload = multer({ storage: storage });

const verifyRFC = (req, res, next) => {
  console.log('Verificando RFC:', req.body.rfc);
  if (!req.body.rfc) {
    return res.status(400).send({ message: 'Please provide an RFC' });
  }
  next();
};

router.post('/', upload.single('image'), verifyRFC, async (req, res) => {
  console.log('Archivo recibido:', req.file);
  if (!req.file) {
    return res.status(400).send({ message: 'Please upload an image' });
  }

  const rfc = req.body.rfc;
  const filename = `${rfc}.webp`;
  const filePath = path.join(__dirname, '../../uploads', filename);

  try {
    await sharp(req.file.path)
      .webp({ quality: 80 })
      .toFile(filePath);
    fs.unlinkSync(req.file.path);
  } catch (error) {
    console.error('Error al convertir la imagen:', error);
    return res.status(500).send({ message: 'Error al procesar la imagen' });
  }

  const imageUrl = `https://cdn-rfcservice.historiallaboral.com/uploads/${filename}`;
  res.send({
    imageUrl: imageUrl,
    filename: filename
  });
});

module.exports = router;
