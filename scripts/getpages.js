const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function getpages() {
  const pagesDirectory = path.join(process.cwd(), 'pages')
  const fileNames = fs.readdirSync(pagesDirectory)
  const pages = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(pagesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      id,
      title: matterResult.data.title
    }
  })
  return JSON.stringify(pages)
}

const fileContents = `export const pages = ${getpages()}`

try {
  fs.readdirSync('cache')
} catch (e) {
  fs.mkdirSync('cache')
}

fs.writeFile('cache/data.js', fileContents, function (err) {
  if (err) return console.log(err)
  console.log('pages cached.')
})