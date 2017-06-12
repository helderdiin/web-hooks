import shell from 'shelljs';
import Utils from '../utils';

let utils = new Utils();

class DockerHubNodejs {
	pushEvents(req, res) {
		if (utils.heavyTest([req.body, req.body.repository]) && req.body.repository.name === 'docker pull helderdiin/nodejs') {
			shell.exec('docker pull helderdiin/nodejs', function() {
				if (utils.handlerShellExecErrors.apply(null, arguments)) {
					shell.exec('docker stop nodejs && docker rm nodejs', function() {
						if (utils.handlerShellExecErrors.apply(null, arguments)) {
							shell.exec('docker run -d -p 4500:4500 --name nodejs helderdiin/nodejs', function() {
								utils.handlerShellExecErrors.apply(null, arguments);
							});
						}
					});
				}
			});

			res.json({
				success: true,
				msg: "The \"helderdiin/nodejs\" service in 207.154.222.9:4500 was updated now."
			});
			return;
		}

		res.json({
			success: false,
			msg: "This route works just for Push Events from master of helderdiin/nodejs repository."
		});
		return;
	}
}

export default DockerHubNodejs;