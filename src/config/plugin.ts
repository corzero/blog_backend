import { EggPlugin } from 'egg';

export default {
  static: false, // default is true
  // jsonwebtoken
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  // ejs
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  // 挂载 egg-socket.io
  // io: {
  //   enable: true,
  //   package: 'egg-socket.io',
  // },
} as EggPlugin;
