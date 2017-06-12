import Logger from './logger';

let logger = new Logger();

class Utils {
	handlerShellExecErrors(code, stdout, stderr) {
		if (code !== 0) {
			var errorTxt = 'Exit code: ' + code + '\n';
				errorTxt += 'Program output: ' + stdout + '\n';
				errorTxt += 'Program stderr: ' + stderr + '\n';

			logger.error(errorTxt, () => {
				console.log('Houston we have a problem... Take a look at the errors_log.txt in logs folder :(');
			});

			return false;
		}

		return true;
	}

	heavyTest(value) {
		if (!Array.isArray(value)) {
			return typeof value !== 'undefined' && value !== null;
		} else {
			return value.indexOf(value.find((val) => {
				return typeof val === 'undefined' || val === null;
			})) === -1;
		}

		// logger.error('Something went wrong in "heavyTest" method with value "' + (''+value) + '" on "Utils" class.');

		// return false;
	}
}

export default Utils;