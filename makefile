default: normal minified

# Set up file lists
g=src/github.js/
files=	${g}main.js\
		${g}options.js\
		${g}api.js

normal:
	cat ${files} > github.js

minified:
	uglifyjs -o github.min.js github.js