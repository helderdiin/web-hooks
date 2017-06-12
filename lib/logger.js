import fs from 'fs';
import path from 'path';

const folders = {
	error: path.join(__dirname, '/logs')
};

class Logger {

	error(txt, cb) {
		let file = path.join(folders.error, '/errors_log.txt'),
			date = new Date(),
			time = date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
			msg = '\n\n======== ' + time + ' ========\n\n' + txt;

		fs.appendFile(file, msg, (err) => {
		  if (err) {
		  	if (err.code === 'ENOENT') {
				fs.mkdir(folders.error, () => {
					this.error(txt, cb);
				});
		  	} else {
		  		throw err;
		  	}
		  	return;
		  }

		  if (typeof cb === 'function') {
		  	cb.apply(null, arguments);
		  }
		});
	}
}

export default Logger;