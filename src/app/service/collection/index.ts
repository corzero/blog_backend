import { Context } from 'egg';
import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Collection } from '../../entity/collection';
import { Repository } from 'typeorm';
import { NewCollection, FilterCollection, DelCollection } from './interface'

@Provide()
export class CollectionService {

  @Inject()
  ctx: Context

  @InjectEntityModel(Collection)
	collectionModel: Repository<Collection>;

  async createCollection(params:NewCollection){
    try {
      let collection = new Collection();
      Object.assign(collection,params)
      return await this.collectionModel.save(collection);
    } catch (error) {
      this.ctx.logger.error(error)
      return false
    }
  }

  async searchList(filter: FilterCollection){
    try {
      const { user_uid, pageSize, pageNo } = filter

      const qb = this.collectionModel
        .createQueryBuilder('collection')
      const total = qb.where('user_uid = :user_uid',{ user_uid })
        .getCount()

      const result = qb.where('user_uid = :user_uid',{ user_uid })
        .skip(pageSize * (pageNo - 1))
        .take(pageSize)

      return { result, total }

    } catch (error) {
      this.ctx.logger.error(error)
      return false
    }
  }

  async delCollections(params: DelCollection){
    try {
      const { ids, user_uid } = params
      const qb = this.collectionModel.createQueryBuilder('collection')
      const result = await qb.where("uid in (:ids) AND user_uid = :user_uid", { ids: ids.toString(), user_uid })
        .execute();
      return result
    } catch (error) {
      this.ctx.logger.error(error)
      return null
    }
  }

}
