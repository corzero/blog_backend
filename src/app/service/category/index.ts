import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Category } from '../../entity/category';
import { Repository } from 'typeorm';
import { ModifyCategory, NewCategory, FilterCategory } from './interface'

@Provide()
export class CategoryService {

  @InjectEntityModel(Category)
	categoryModel: Repository<Category>;

  async createCategory(params:NewCategory){
    try {
      let category = new Category();
      Object.assign(category,params)
      return await this.categoryModel.save(category);
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async modifyCategory(params: ModifyCategory){
    try {
      let category = new Category();
      const { uid, ...rest } = Object.assign(category,params)
      return await this.categoryModel.update(rest,{uid});
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async searchList(filter: FilterCategory){
    try {
      const { title } = filter

      const qb = this.categoryModel
        .createQueryBuilder('category')
      const total = qb.where('title = :title',{title:`%${title}%`})
        .getCount()

      const result = qb.where('title = :title',{title:`%${title}%`})
        .skip(filter.pageSize * (filter.pageNo - 1))
        .take(filter.pageSize)

      return { result, total }

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getCategoryById(uid:string){
    try {
      return await this.categoryModel.findOne({uid})
    } catch (error) {
      console.log(error)
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
      console.log(error)
      return null
    }
  }

}
