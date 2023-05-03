const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');
const startWebService = require('./StartWebService.js');

// The environment variables NODE_ENV and PORT should already be set before executing this file.
// Will copy over a specified config file, passed in as an argument, before starting the web service.
if (process.argv.length < 3) {
	console.log("Missing config path argument.");
	process.exit(1);
}

if (fs.existsSync(process.argv[2]) && fs.lstatSync(process.argv[2]).isFile()) {
	fs.copyFileSync(process.argv[2], path.join(require.main.path, "private.config"));
} else {
	console.log("Config path is not an existing file.");
	process.exit(1);
}

startWebService();
