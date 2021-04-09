/*
 * @Author: zhangyang
 * @Date: 2021-04-09 14:10:41
 * @LastEditTime: 2021-04-09 14:21:32
 * @Description: 管理 Websocket 消息
 */

import WebSocket, { Server as WebSocketServer } from "ws";

export class MySocket {
  private uid: string;
  private conn: WebSocket;
  private server: WebSocketServer;
  constructor(uid: string, conn: WebSocket, server: WebSocketServer) {
    this.uid = uid;
    this.conn = conn;
    this.server = server;
  }

  getOnlines() {
    let connections = this.server.clients;
    console.log(connections);
  }

  msgProcess(str: any) {
    console.log('消息处理');
  }

  offLineSend() {
    console.log('清空离线消息队列');
  }
}