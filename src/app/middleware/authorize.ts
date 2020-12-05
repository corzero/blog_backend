import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
// import { WHITE_LIST } from '../config/config.default'

@Provide()
export class AuthorizeMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      console.log(ctx.originalUrl,ctx.method)
      await next();
    };
  }
}
