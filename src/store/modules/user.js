import * as user from '@/api/user';
import * as types from '../action-types';
import { setLocal, getLocal } from '@/utils/local';
import per from '@/router/per';
import router from '@/router';
const filterRouter = (authList) => {
  let auths = authList.map(auth => auth.auth);
  function filter(routes) {
    return routes.filter(route => {
      if (auths.includes(route.meta.auth)) {
        if (route.children) {
          route.children = filter(route.children);
        }
        return route;
      }
    })
  }
  return filter(per);
}
export default {
  state: {
    userInfo: {}, //用户信息
    hasPermission: false, //代表用户权限
    menuPermission: false,
  },
  mutations: {
    [types.SET_USER](state, userInfo) {
      state.userInfo = userInfo;
      if (userInfo && userInfo.token) {
        setLocal('token', userInfo.token);
      } else {
        localStorage.clear('token');
      }
    },
    [types.SET_PERMISSION](state, has) {
      state.hasPermission = has;
    },
    [types.SET_MENU_PERMISSION](state, has) {
      state.menuPermission = has;
    }
  },
  actions: {
    async [types.SET_USER]({ commit }, { payload, permission }) {
      commit(types.SET_USER, payload);
      commit(types.SET_PERMISSION, permission);
    },
    async [types.USER_LOGIN]({ commit, dispatch }, payload) {
      try {
        let result = await user.login(payload);
        dispatch(types.SET_USER, { payload: result.data, permission: true });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async [types.USER_VALIDATE]({ commit, dispatch }) {
      // 如果没有token 就不用发请求了 肯定没登录
      if (!getLocal('token')) return false;
      try {
        let result = await user.validate();
        dispatch(types.SET_USER, { payload: result.data, permission: true });
        return true;
      } catch (e) {
        dispatch(types.SET_USER, { payload: {}, permission: false });
        return false;
      }
    },
    async [types.USER_LOGOUT]({ commit, dispatch }) {
      dispatch(types.SET_USER, { payload: {}, permission: false });
    },
    async [types.ADD_ROUTE]({ commit, state }) {
      // 后端返回的用户权限
      let authList = state.userInfo.authList;
      console.log(authList, per);
      if (authList) { //通过权限过了出当前用户的路由
        let routes = filterRouter(authList);
        // 找到manager路由
        let route = router.options.routes.find(item => item.path === '/manager');
        route.children = routes;  //给它添加儿子路由
        router.addRoutes([route]);  //动态添加进去
        console.log(route);
        commit(types.SET_MENU_PERMISSION, true);  //权限设置完毕
      }
    }
  }
}