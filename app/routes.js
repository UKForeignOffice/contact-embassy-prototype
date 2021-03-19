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

router.post(UPLOADS_PATH, upload.single('csv'), (req, res, next) => {
  res.redirect(`/embassy?csv=${req.file.originalname}`)
})


router.get('/level1', (req, res, next) => {
  if (req.session.data.csv) {
    const data = fs.readFileSync(`./${UPLOADS_PATH}/${req.session.data.csv}`, 'utf8')
    res.locals.levels = parseCsv(data)
    req.session.data.levels = res.locals.levels
    next()
  } else {
    res.redirect('/error-csv')
  }
})

router.get('/level2', (req, res, next) => {
  const {title, ...level2Items} = req.session.data.levels.level2[req.query.label]
  res.locals.level2 = {
    title,
    items: Object.keys(level2Items).map(key => ({
      label: key,
      items: req.session.data.levels.level2[req.query.label][key]
    }))
  }
  next()
})
module.exports = router
