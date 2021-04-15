const Papa = require('papaparse');

module.exports = csv => {
  const results = Papa.parse(csv, {
    header: true
  });
  const headers = results.meta.fields;
  const level1Label = headers[0];
  const level2Label = headers[1];
  const level2Link = headers[2];
  const levels = new Map()
  return results.data
    .reduce((acc, current) => {
      if (!acc.get(current[level1Label])) {
        acc.set(current[level1Label], [])
      }
      acc.get(current[level1Label]).push({ label: current[level2Label], link: current[level2Link]})
      return acc
    }, levels)
}
