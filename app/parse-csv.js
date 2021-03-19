const Papa = require('papaparse');

module.exports = buffer => {
  const csv = buffer.toString('utf8')
  const results = Papa.parse(csv, {
    header: true
  });
  const headers = results.meta.fields;
  const level2 = {}
  const level1 = results.data
    .map(val => {
      const level1Label = val[headers[0]];
      const level1Link = val[headers[1]];
      const level2Title = val[headers[2]];
      const level2Label = val[headers[3]];
      const level3Label = val[headers[4]];
      const level3Link = val[headers[5]];
      level2[level1Label] = level2[level1Label] || { title: level2Title }
      level2[level1Label][level2Label] = level2[level1Label][level2Label] || []
      level2[level1Label][level2Label].push({ label: level3Label, url: level3Link})
      return { label: level1Label, link: level1Link }
    })
    .filter((val, index, self) => self.findIndex(item => item.label === val.label) === index)

  return { level1, level2 }
}
