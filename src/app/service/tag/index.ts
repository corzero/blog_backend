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
      tag = { ...tag, ...params }
      return await this.tagModel.save(tag);
    } catch (error) {
      this.ctx.logger.error(error)
      return false
    }
  }

  async modifyTag(params: ModifyTag){
    try {
      const { uid, ...rest } = params
      let qb = this.tagModel
          .createQueryBuilder('tag')
      return await qb.update(rest).where('uid = :uid', { uid }).execute()
    } catch (error) {
      this.ctx.logger.error(error)
      return false
    }
  }

  async searchList(filter: FilterTag){
    try {
      const { title, pageSize, pageNo } = filter
      console.log('filter',filter)
      this.ctx.logger.info(filter)
      let qb = this.tagModel
          .createQueryBuilder('tag')
      if(title){
        const total = qb.where('title = :title',{title:`%${title}%`})
          .getCount()

        const result = qb.where('title = :title',{title:`%${title}%`})
          .skip(pageSize * (filter.pageNo - 1))
          .take(pageSize)
        return { result, total }
      } else {
        qb = await qb.select()
        const total = await qb.getCount()
        const list = await qb.take(pageSize).skip((pageNo - 1) * pageSize).getMany()
        return { list, total }
      }
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
