import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';
import startWebService from './StartWebService.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The environment variables NODE_ENV and PORT should already be set before executing this file.
// Will copy over a specified config file, passed in as an argument, before starting the web service.
if (process.argv.length < 3) {
	console.log("Missing config path argument.");
	process.exit(1);
}

if (fs.existsSync(process.argv[2]) && fs.lstatSync(process.argv[2]).isFile()) {
	fs.copyFileSync(process.argv[2], path.join(__dirname, "private.config"));
} else {
	console.log("Config path is not an existing file.");
	process.exit(1);
}

startWebService();
