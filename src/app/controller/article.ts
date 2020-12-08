import { Context } from 'egg';
import { Controller, Get, Inject, Provide, Post, Del, Body, ALL, Param } from '@midwayjs/decorator';
import { ArticleService } from '../service/article'
import { CreateArticleDTO, ModifyArticleDTO, FilterArticleDTO } from '../dto/article.dto'
import { AIP_PREFIX } from '../../config/config.default'

@Provide()
@Controller(`${AIP_PREFIX}/article`)
export class ArticleController {

  @Inject()
  ctx: Context

  @Inject()
  articleService: ArticleService

  @Get('/:uid')
  async getOneArticle(@Param() uid: string) {
    try {
      const result =  await this.articleService.getArticleById(uid)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Post('/list')
  async getArticleList(@Body(ALL) filter: FilterArticleDTO) {
    try {
      const result = await this.articleService.searchList(filter)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Post('/create')
  async createArticle(@Body(ALL) params: CreateArticleDTO) {
    try {
      const result = await this.articleService.createArticle(params)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Post('/modify')
  async modifyArticle(@Body(ALL) params: ModifyArticleDTO) {
    try {
      const result = await this.articleService.modifyArticle(params)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Del('/del')
  async delArticle(@Body(ALL) params: {ids: string[]}) {
    try {
      const result = await this.articleService.delArticle(params.ids)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

}
