default: normal minified

# Set up file lists
g=src/github.js/
files=	${g}main.js\
		${g}api.js\
		${g}options.js\
		\
		${g}APIRequest.js\
		${g}APIRequest/JSONRequest.js\
		${g}APIRequest/JSONRequest/HTTPRequest.js\
		\
		${g}footer.js

normal:
	cat ${files} > github.js

minified:
	uglifyjs -o github.min.js github.js