const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const parseCsv = require('./parse-csv')

router.post('/uploads', upload.single('csv'), (req, res, next) => {
  req.session.data.levels = parseCsv(req.file.buffer)
  res.redirect('/level1')
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
