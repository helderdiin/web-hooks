import express from 'express';
import bodyParser from 'body-parser';

import DockerHubNodejs from "./repos/docker-hub-nodejs";

let dockerHubNodejs = new DockerHubNodejs();

const app = express();
const hooksRoutes = express.Router();
const port = process.env.PORT || 3003;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Bem-vindo, essa é a hooks para configuração de Web Hooks!');
});

hooksRoutes.route('/docker-hub-nodejs')
	.post((req, res) => {
		dockerHubNodejs.pushEvents(req, res);
	});

app.use('/hooks', hooksRoutes);

app.listen(port, () => {
	console.log('App running on port ' + port);
});
