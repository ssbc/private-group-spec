const { join } = require('path')
const fs = require('fs')

const types = [
  'group/init',
  'group/add-member',
  'group/content'
]

types.forEach(type => {
  const inputPath = '.' + join('/', type, 'schema.js')
  const schema = require(inputPath)

  const outputPath = join(__dirname, type, 'schema.json')
  const content = JSON.stringify(schema, null, 2)
  fs.writeFileSync(outputPath, content)
})
