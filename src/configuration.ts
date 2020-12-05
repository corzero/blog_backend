import { Configuration, App } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import * as orm from '@midwayjs/orm';
import { Application } from 'egg';

@Configuration({
  imports: [
    orm //加载 orm 组件
  ]
})
export class ContainerLifeCycle implements ILifeCycle {

  @App()
  app: Application;

  async onReady() {
    // this.app.use(await this.app.generateMiddleware('reportMiddleware'))
  }
}
