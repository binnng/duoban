minify = require('html-minifier').minify
fs = require "fs"

result = minify fs.readFileSync("duoban.html", "utf-8"),
  collapseWhitespace: true
  conservativeCollapse: true
  collapseBooleanAttributes: true
  removeCommentsFromCDATA: true
  removeOptionalTags: true
  removeComments: true

fs.writeFileSync "dist/index.html", result