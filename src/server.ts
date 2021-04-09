import { myredis } from './database/conn';
/*
 * @Author: zhangyang
 * @Date: 2020-09-23 08:58:47
 * @LastEditTime: 2021-04-09 16:17:19
 * @Description: http 服务器启动配置
 */
import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-bodyparser';
import helmet from 'koa-helmet';
import staticFile from 'koa-static';
import path from 'path';
import router from './routers';
import WebSocket, { Server as WebSocketServer } from 'ws';
import conf from '../conf';

import logger from './middleware/logger';
import { MySocket } from './model/socket';
import { URLSearchParams } from 'url';

export const createApp = () => {
  const app = new Koa();
  const httpPort = conf.CONF_HTTP_PORT;
  // 数据解析
  app.use(koaBody());
  // 处理跨域
  app.use(cors());
  // 加入安全的响应头信息
  app.use(helmet());
  // 记录日志
  app.use(logger());
  // 静态文件托管
  app.use(staticFile(path.join(__dirname, '../public')));

  app.use(router());
  app.listen(httpPort, () => {
    console.log('服务器运行中......');
    console.log(`http://localhost:${httpPort}`);
  });
};
let ws: WebSocketServer;
/**
 * 推送消息格式化
 */
const pushFormat = ({ model = 0, type = 0, id = 0, data = {} }) => {
  return JSON.stringify({ model, type, id, data });
}
/**
 * token验证专用
 */
const tokenCheck = async (sign: string, uid: string, conn: WebSocket) => {
  const md5 = require('md5');
  const token = await myredis.get(uid + '_token');
    if (md5(uid + token) == sign) {
      // 验证成功
      let socket = new MySocket(uid, conn, ws);
      // 清空离线消息队列
      socket.offLineSend();

      conn.on('message', (str: string) => {
        try {
          str = JSON.parse(str);
        } catch (error) {
          null;
        }
        socket.msgProcess(str);
      });

      conn.on('close', (code, reason) => {
        console.log('socket服务器关闭:\n' + code + reason);
      });
      conn.on('error', (code: Error, reason: any) => {
        console.log('服务器异常关闭:\n' + code + reason);
      });
      const str = JSON.stringify({
        status: 0,
        data: null,
        msg: '签名验证成功'
      });
      console.log('token 验证成功');
      conn.send(str);
        // 挤号
        // let onlines = getOnlines(websocketServer);
        // for (const iterator of onlines) {
        //     if (iterator.uid == uid && iterator.key != socket.conn.key) {
        //         iterator.sendText(pushFormat({
        //             model: 100,
        //             type: 0,
        //             id: 4000,
        //             data: {
        //                 tips: '账号异地登录，请重新登陆'
        //             }
        //         }));
        //     }
        // }
    } else {
      conn.send(pushFormat({
        model: 100,
        type: 0,
        id: 4003,
        data: { tips: '签名验证失败，即将断开连接' }
      }));
      setTimeout(() => conn.close(4000, '签名错误'), 500);
    }
}
export const createWebSocket = () => {
  const wsPort = conf.CONF_WS_PORT;
  ws = new WebSocketServer({
    port: wsPort
  });
  ws.on('connection', async (socket, req) => {
    const { uid, sign } = Object.fromEntries(Array.from(new URLSearchParams(req.url?.substr(1))));
    tokenCheck(sign, uid, socket);
  });
  console.log('websocket 服务已启动');
  console.log(`ws://localhost:${wsPort}`);
};

export default createApp;