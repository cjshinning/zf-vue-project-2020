import store from '../store';
import * as types from '../store/action-types';

// 登录权限校验
const loginPermission = async function (to, from, next) {
  let r = await store.dispatch(`user/${types.USER_VALIDATE}`);
  let needLogin = to.matched.some(item => item.meta.needLogin);

  // 根据meta来判断是否登录过
  if (!store.state.user.hasPermission) {
    // 没登录但是访问页面需要登录
    if (needLogin) {
      if (r) {
        next(); // 需要登录 并且登录了 继续即可
      } else {
        next('/login');
      }
    } else {
      next(); //没登录 也不用权限
    }
  } else {
    // 登录过
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
  }

  next();
}

// 路由权限动态添加
export const menuPermission = async function (to, from, next) {
  if (store.state.user.hasPermission) {
    if (!store.state.user.menuPermission) {
      // 添加好了
      store.dispatch(`user/${types.ADD_ROUTE}`);
      // next();
      next({ ...to, replace: true }); //进入页面时 404
    } else {
      next();
    }
  } else {
    next();
  }
}

export const createWebSocket = async function (to, from, next) {
  // 如果登录了 但是没有创建websocket
  if (store.state.user.hasPermission && !store.state.ws) {
    store.dispatch(`${types.CREATE_WEBSOCKET}`);
    next();
  } else {
    next();
  }
}

export default {
  loginPermission,
  menuPermission,
  createWebSocket
}