import env from 'libs/network/env';
import { Server, Header } from '../server';

/**
 * 필요한 서버를 확장할수 있음
 */
const server = new Server(env.URLS.API);
const builder = Header.Builder;
server.setHeader(
  builder
    .setHeader('Content-type', 'application/json;charset=UTF-8')
    .setHeader('Accept', 'application/json')
    .build(),
);

export default server;
