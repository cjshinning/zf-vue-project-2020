// websocke可以实现双向通信 长连接 h5提供的 可以实时通信
import store from '@/store';
import { getLocal } from '@/utils/local';
import * as types from '@/store/action-types';
class WS {
  constructor(config = {}) {
    this.url = config.url || 'localhost';
    this.port = config.port || 4000;
    this.protocol = config.protocol || 'ws';
    // 心跳检测
    this.time = config.time || 30 * 1000;
    this.ws = null;
  }
  onOpen = () => {  //规定好发的必须是对象，对象里包含两个字段 type data
    // websocket是基于tcp的 第一次连接靠的http 但是不能修改header
    this.ws.send(JSON.stringify({
      type: 'auth',
      data: getLocal('token')
    }));
  }
  onMessage = (e) => {
    let { type, data } = JSON.parse(e.data);
    switch (type) {
      case 'noAuth':
        console.log('没有权限');
        break;
      case 'heartCheck':
        this.checkServer();
        this.ws.send(JSON.stringify({ type: 'heartCheck' }));
        break;
      default:
        // console.log('message', data);
        store.commit(types.SET_MESSAGE, data);
    }
  }
  onClose = () => {
    this.ws.close();
  }
  onError = () => {
    setTimeout(() => {
      this.create();
    }, 1000)
  }
  create() {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`);
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
    this.ws.onclose = this.onClose;
    this.ws.onerror = this.onError;
  }
  checkServer() {
    clearTimeout(this.timer); //防抖
    this.timer = setTimeout(() => {
      this.onClose();
      this.onError();
    }, this.time + 1000); //断线重连
  }
  send = (msg) => {
    this.ws.send(JSON.stringify(msg));
  }
}
export default WS;