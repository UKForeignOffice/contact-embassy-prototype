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
  res.locals.level2 = Object.keys(req.session.data.levels.level2[req.query.label]).map(key => ({
    label: key,
    items: req.session.data.levels.level2[req.query.label][key]
  }))
  next()
})
module.exports = router
