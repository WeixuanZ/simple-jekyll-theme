/* Custom standard-version updater to update gemspec version
 * 2020 W Zhang
 */

const extractVersionLine = (lines) =>
  lines
    .split('\n')
    .filter((line) => line.trim().slice(0, 12) === 'spec.version')[0]

const extractVersion = (versionLine) =>
  versionLine.split('=')[1].trim().replace(/"|'/g, '')

module.exports.readVersion = function (contents) {
  return extractVersion(extractVersionLine(contents))
}

module.exports.writeVersion = function (contents, version) {
  const oldVersionLine = extractVersionLine(contents)
  return contents.replace(
    oldVersionLine,
    oldVersionLine.replace(extractVersion(oldVersionLine), version)
  )
}
