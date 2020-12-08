import { Context } from 'egg';
import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Tag } from '../../entity/tag';
import { Repository } from 'typeorm';
import { ModifyTag, NewTag, FilterTag } from './interface'

@Provide()
export class TagService {

  @Inject()
  ctx: Context

  @InjectEntityModel(Tag)
	tagModel: Repository<Tag>;

  async createTag(params:NewTag){
    try {
      let tag = new Tag();
      Object.assign(tag,params)
      return await this.tagModel.save(tag);
    } catch (error) {
      this.ctx.logger.error(error)
      return false
    }
  }

  async modifyTag(params: ModifyTag){
    try {
      let tag = new Tag();
      const { uid, ...rest } = Object.assign(tag,params)
      return await this.tagModel.update(rest,{uid});
    } catch (error) {
      this.ctx.logger.error(error)
      return false
    }
  }

  async searchList(filter: FilterTag){
    try {
      const { title, type } = filter

      const qb = this.tagModel
        .createQueryBuilder('tag')
      const total = qb.where('title = :title',{title:`%${title}%`})
        .orWhere('type = :type',{ type })
        .getCount()

      const result = qb.where('title = :title',{title:`%${title}%`})
        .orWhere('type = :type',{ type })
        .skip(filter.pageSize * (filter.pageNo - 1))
        .take(filter.pageSize)

      return { result, total }

    } catch (error) {
      this.ctx.logger.error(error)
      return false
    }
  }

  async getTagById(uid:string){
    try {
      return await this.tagModel.findOne({uid})
    } catch (error) {
      this.ctx.logger.error(error)
      return null
    }
  }

  async delTags(ids: string[]){
    try {
      const qb = this.tagModel.createQueryBuilder('tag')
      const result = await qb.where("id in (:id)", { id: ids.toString() })
        .execute();
      return result
    } catch (error) {
      this.ctx.logger.error(error)
      return null
    }
  }

}
