import { getSlider } from '../api/public';
import * as types from './action-types';
import WS from '@/utils/websocket';

export default {
  state: {
    sliders: [],
    ws: null,
    message: ''
  },
  getters: {
  },
  mutations: {
    [types.SET_SLIDERS](state, payload) {
      state.sliders = payload;
    },
    [types.CREATE_WEBSOCKET](state, ws) {
      state.ws = ws;
    },
    [types.SET_MESSAGE](state, msg) {
      state.message = msg;
    }
  },
  actions: {
    async [types.SET_SLIDERS]({ commit }) {
      let { data } = await getSlider();
      commit(types.SET_SLIDERS, data);
    },
    async [types.CREATE_WEBSOCKET]({ commit }) {
      let ws = new WS();
      ws.create();
      commit(types.CREATE_WEBSOCKET, ws);
    }
  },
  modules: {
  }
}