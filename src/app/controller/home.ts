import { Context } from 'egg';
import { Controller, Get, Inject, Provide } from '@midwayjs/decorator';

@Provide()
@Controller('/')
export class HomeController {

  @Inject()
  ctx: Context

  @Get('/')
  async home() {
    await this.ctx.render('index.html')
    // return 'Hello Midwayjs!';
  }

}
