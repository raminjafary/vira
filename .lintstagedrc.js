module.exports = {
	'**/*.{ts,js}': (fileNames) =>
		`cross-env NODE_ENV=production eslint --ext .js,.ts,.vue --ignore-path .gitignore ${fileNames.join(
			' '
		)} --fix`,
	'**/*': (fileNames) =>
		`prettier  --ignore-path .gitignore -u --write ${fileNames.join(' ')} --fix`,
}