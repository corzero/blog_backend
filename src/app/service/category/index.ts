import { Context } from 'egg';
import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Category } from '../../entity/category';
import { Repository } from 'typeorm';
import { ModifyCategory, NewCategory, FilterCategory } from './interface'

@Provide()
export class CategoryService {

  @Inject()
  ctx: Context

  @InjectEntityModel(Category)
	categoryModel: Repository<Category>;

  async createCategory(params:NewCategory){
    try {
      console.log('params\n\n\n', params)
      let category = new Category();
      category = { ...category, ...params }
      // Object.assign(category, params)
      return await this.categoryModel.save(category);
    } catch (error) {
      this.ctx.logger.error(error)
      return false
    }
  }

  async modifyCategory(params: ModifyCategory){
    try {
      const { uid, ...rest } = params
      let qb = this.categoryModel
          .createQueryBuilder('category')
      return await qb.update(rest).where('uid = :uid', { uid }).execute()
    } catch (error) {
      this.ctx.logger.error(error)
      return false
    }
  }

  async searchList(filter: FilterCategory){
    try {
      const { title, pageSize, pageNo } = filter
      console.log('filter',filter)
      this.ctx.logger.info(filter)
      let qb = this.categoryModel
          .createQueryBuilder('category')
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

  async getCategoryById(uid:string){
    try {
      return await this.categoryModel.findOne({uid})
    } catch (error) {
      this.ctx.logger.error(error)
      return null
    }
  }

  async delCategories(ids: string[]){
    try {
      const qb = this.categoryModel.createQueryBuilder('category')
      const result = await qb.where("id in (:id)", { id: ids.toString() })
        .execute();
      return result
    } catch (error) {
      this.ctx.logger.error(error)
      return null
    }
  }

}
