import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class ExceptionsMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
        try {
            // 无错误则直接放行
            await next();

            // if (ctx.status === 404 && ! ctx.body) {
            //   ctx.body = ctx.helper.errorRes(404,'当前请求不存在');
            // }
          } catch (error) {

            console.log('中间件报错信息提示：', error)

            // 状态码
            let statusCode = error.status || 500;
            // 错误提示
            let statusMessage = error.message || 'error';

            // 处理由 jwt 签发的 token 失效异常
            if (error.name === 'TokenExpiredError') {
              statusCode = 403;
              statusMessage = 'token 已过期，请重新登录';
            }

            // 处理由 jwt 验证 token 非法异常
            if (error.name === 'JsonWebTokenError') {
              statusCode = 422;
              statusMessage = '非法的 token';
            }

            // 响应返回
            ctx.body = ctx.helper.errorRes(statusCode, statusMessage);
          }
    };
  }

}
