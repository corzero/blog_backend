import { Context } from 'egg';
import { Controller, Inject, Provide, Post, Del, Body, ALL } from '@midwayjs/decorator';
import { CollectionService } from '../service/collection'
import { FilterCollectionDTO, CreateCollectionDTO, DelCollectionDTO } from '../dto/collection.dto'
import { AIP_PREFIX } from '../../config/config.default'

@Provide()
@Controller(`${AIP_PREFIX}/collection`)
export class CollectionController {

  @Inject()
  ctx: Context

  @Inject()
  collectionService: CollectionService


  @Post('/list')
  async getCollectionList(@Body(ALL) filter: FilterCollectionDTO) {
    try {
      const result = await this.collectionService.searchList(filter)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Post('/create')
  async createCollection(@Body(ALL) params: CreateCollectionDTO) {
    try {
      const result = await this.collectionService.createCollection(params)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Del('/del')
  async delCollection(@Body(ALL) params: DelCollectionDTO) {
    try {
      const result = await this.collectionService.delCollections(params)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      this.ctx.logger.error(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }
}
