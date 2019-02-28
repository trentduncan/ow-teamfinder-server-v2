import config from './config';
import server from './_registry/server';

const port = config.port;

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
