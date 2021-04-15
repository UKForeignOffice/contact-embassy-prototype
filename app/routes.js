const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })
const parseCsv = require('./parse-csv')
const UPLOADS_PATH = '/uploads'

let levels;

router.post(UPLOADS_PATH, upload.single('csv'), (req, res, next) => {
  res.redirect(`/embassy?csv=${req.file.originalname}`)
})

router.post('/contact-us-submit', (req, res, next) => {
  res.redirect('/contact-us-confirmation')
})

router.get('/embassy', (req, res, next) => {
  if (req.session.data.csv) {
    const data = fs.readFileSync(`./${UPLOADS_PATH}/${req.session.data.csv}`, 'utf8')
    levels = parseCsv(data)
    next()
  } else {
    res.redirect('/error-csv')
  }
})

router.get('/level1', (req, res, next) => {
  if (levels) {
    res.locals.levels = levels;
  }
  next();
})

module.exports = router
