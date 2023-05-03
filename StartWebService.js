import {createServer} from 'node:http';
import {parse} from 'node:url';
import next from 'next';

// Starts the web server.
// The environment variables NODE_ENV and PORT must be set before calling startWebService().
export default function startWebService() {	
	
	const dev = process.env.NODE_ENV !== 'production';
	const app = next({ dev });
	const handle = app.getRequestHandler();
	
	const port = process.env.PORT || 3000;
		
	app.prepare().then(() => {
		createServer(
			(req, res) => {
				// Be sure to pass `true` as the second argument to `url.parse`.
				// This tells it to parse the query portion of the URL.
				//const parsedUrl = parse(req.url, true);
				
				const host = req.headers.host;
				
				// This is what we SHOULD be able to use, but NextJS hasn't addressed its dependence
				// on the deprecated parse() function.
				//const parsedUrl = new URL(req.url,`http://${host}`);
				
				const parsedUrl = parse(req.url, true);
								
				handle(req, res, parsedUrl);
			}
		).listen(
			port,
			(err) => {
				if (err) throw err
				console.log(`> Ready on http://localhost:${port}`)
			}
		);
	});
}
