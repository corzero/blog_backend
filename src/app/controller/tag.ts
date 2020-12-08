import { Context } from 'egg';
import { Controller, Get, Inject, Provide, Post, Del, Body, ALL, Param } from '@midwayjs/decorator';
import { TagService } from '../service/tag'
import { FilterTagDTO,ModifyTagDTO,CreateTagDTO } from '../dto/tag.dto'
import { AIP_PREFIX } from '../../config/config.default'

@Provide()
@Controller(`${AIP_PREFIX}/tag`)
export class TagController {

  @Inject()
  ctx: Context

  @Inject()
  tagService: TagService

  @Get('/:uid')
  async getOneTag(@Param() uid: string) {
    try {
      const result =  await this.tagService.getTagById(uid)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Get('/list')
  async getTagList(@Body(ALL) filter: FilterTagDTO) {
    try {
      const result = await this.tagService.searchList(filter)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Post('/create')
  async createTag(@Body(ALL) params: CreateTagDTO) {
    try {
      const result = await this.tagService.createTag(params)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Post('/modify')
  async modifyTag(@Body(ALL) params: ModifyTagDTO) {
    try {
      const result = await this.tagService.modifyTag(params)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Del('/del')
  async delTag(@Body(ALL) params: {ids: string[]}) {
    try {
      const result = await this.tagService.delTags(params.ids)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }
}
