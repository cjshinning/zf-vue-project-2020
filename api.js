const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const svgCaptcha = require('svg-captcha');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.set({
    // 'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credential': true,
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,name,Access-token,authorization'
  })
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
})

app.get('/get', function (req, res) {
  res.json(req.query);
})
app.post('/post', function (req, res) {
  res.json(req.body);
})
app.post('/post_timeout', function (req, res) {
  let { timeout } = req.query;
  console.log(req.query);
  if (timeout) {
    timeout = parseInt(timeout);
  } else {
    timeout = 0;
  }
  setTimeout(function () {
    res.json(req.body);
  }, timeout)
})
app.post('/post_status', function (req, res) {
  let { code } = req.query;
  if (code) {
    code = parseInt(code);
  } else {
    code = 0;
  }
  res.statusCode = code;
  res.json(req.body);
})


// 登录注册
app.post('/user/reg', function (req, res) {
  res.send({
    err: 0,
    data: '注册成功'
  });
})


const usernames = ['ant.design', 'admin', 'superuser', 'admin@123.com'];
const passwords = ['ant.design', 'admin', '123', '111'];

app.post('/api/login/account', function (req, res) {
  const { password, username, type } = req.body;

  if (!usernames.includes(username) || !passwords.includes(password)) {
    res.status(400).send({
      data: {
        isLogin: true,
      },
      errorMessage: '账户或密码错误',
      success: false,
    });
    return;
  }

  res.send({
    type: 'account',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.PObw1E6dwD2Mo9vLQUO8CQxzITNXx4ABu7mS2zWLeJk',
    success: true,
  });
})

// 获取当前用户信息
app.get('/api/currentUser', function (req, res) {
  res.send({
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
    role: {
      id: 1,
      name: '管理员',
      describe: '管理员角色',
      permissions: [
        { id: 1001, roleId: 1, name: 'home', actions: ['query'] },
        { id: 1002, roleId: 1, name: 'dashboard', actions: ['query'] },
        { id: 1003, roleId: 1, name: 'form', actions: ['query', 'add', 'update', 'delete'] },
      ],
    },
  });
})

// 动态导航生成
const userNavDataSource = [
  {
    name: 'dashboard',
    parentId: 0,
    id: 1,
    name: 'Welcome',
    component: 'RouteView',
    redirect: '/workplace',
  },
  {
    name: 'workplace',
    parentId: 1,
    id: 7,
    path: '/workplace',
    component: '/dashboard/workplace/index.vue'
  },
  {
    name: 'Analysis',
    parentId: 1,
    id: 2,
    path: '/dashboard/analysis',
    component: 'dashboard/analysis'
  }
];

app.get('/api/currentUserNav', function (req, res) {
  res.send(userNavDataSource);
})


app.post('/api/logout', function (req, res) {
  res.send({
    success: true,
  });
})

// 临时接口
app.get('/public/getSliders', function (req, res) {
  res.send({
    err: 0,
    data: [{
      id: 1,
      url: 'https://www.51zxw.net/NewAn/UploadFiles/20231225/202312250918387408.jpg',
    }, {
      id: 2,
      url: 'https://www.51zxw.net/NewAn/UploadFiles/20240119/202401190942004680.jpg',
    }, {
      id: 3,
      url: 'https://www.51zxw.net/NewAn/UploadFiles/20231220/202312200229080700.jpg',
    }]
  });
})


app.get('/public/getCaptcha', function (req, res) {
  let captcha = svgCaptcha.create();
  let { text, data } = captcha;
  res.send({
    err: 0,
    data: data
  });
})

app.post('/user/login', function (req, res) {
  res.send({
    err: 0,
    data: {
      _id: '123456789',
      authList: [
        {
          _id: '101',
          id: 1,
          pid: -1,
          name: '用户管理',
          role: 'a1'
        },
        {
          _id: '102',
          id: 2,
          pid: 1,
          name: '用户权限',
          role: 'a1',
          path: '/manager/userAuth',
          auth: 'userAuth'
        },
        {
          _id: '103',
          id: 3,
          pid: 1,
          name: '用户统计',
          role: 'a1',
          path: '/manager/userStatistics',
          auth: 'userStatistics'
        },
        {
          _id: '104',
          id: 4,
          pid: -1,
          name: '信息发布',
          role: 'a1',
          path: '/manager/infoPublic',
          auth: 'infoPublic'
        },
        {
          _id: '105',
          id: 5,
          pid: -1,
          name: '文章管理',
          role: 'a1',
          path: '/manager/articleManager',
          auth: 'articleManager'
        }
      ],
      avatar: '',
      gender: -1,
      name: '',
      role: '123abc',
      status: '0',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.PObw1E6dwD2Mo9vLQUO8CQxzITNXx4ABu7mS2zWLeJk',
      username: 'admin'
    }
  });
})

app.get('/user/validate', function (req, res) {
  res.send({
    err: 0,
    data: {
      _id: '123456789',
      authList: [
        {
          _id: '101',
          id: 1,
          pid: -1,
          name: '用户管理',
          role: 'a1'
        },
        {
          _id: '102',
          id: 2,
          pid: 1,
          name: '用户权限',
          role: 'a1',
          path: '/manager/userAuth',
          auth: 'userAuth'
        },
        {
          _id: '103',
          id: 3,
          pid: 1,
          name: '用户统计',
          role: 'a1',
          path: '/manager/userStatistics',
          auth: 'userStatistics'
        },
        {
          _id: '104',
          id: 4,
          pid: -1,
          name: '信息发布',
          role: 'a1',
          path: '/manager/infoPublic',
          auth: 'infoPublic'
        },
        {
          _id: '105',
          id: 5,
          pid: -1,
          name: '文章管理',
          role: 'a1',
          path: '/manager/articleManager',
          auth: 'articleManager'
        }
      ],
      avatar: '',
      gender: -1,
      name: '',
      role: '123abc',
      status: '0',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.PObw1E6dwD2Mo9vLQUO8CQxzITNXx4ABu7mS2zWLeJk',
      username: 'admin'
    }
  });
})



app.listen(3000);