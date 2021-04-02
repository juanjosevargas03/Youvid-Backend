import server from './server';
import './database';

server.listen(server.get('port'),() => console.log('server on port ',server.get('port')))
