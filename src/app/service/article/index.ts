import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Article } from '../../entity/article';
import { Repository } from 'typeorm';
import { ModifyArticle, NewArticle, FilterArticle } from './interface'

@Provide()
export class ArticleService {

  @InjectEntityModel(Article)
	articleModel: Repository<Article>;

  async createArticle(params:NewArticle){
    try {
      let article = new Article();
      Object.assign(article,params)
      return await this.articleModel.save(article);
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async modifyArticle(params: ModifyArticle){
    try {
      let article = new Article();
      const { uid, ...rest } = Object.assign(article,params)
      return await this.articleModel.update(rest,{uid});
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async searchList(filter: FilterArticle){
    try {
      const { title, author } = filter

      const qb = this.articleModel
        .createQueryBuilder('article')
      const total = qb.where('title = :title',{title:`%${title}%`})
        .orWhere('author = :author',{ author })
        .getCount()

      const result = qb.where('title = :title',{title:`%${title}%`})
        .orWhere('author = :author',{ author })
        .skip(filter.pageSize * (filter.pageNo - 1))
        .take(filter.pageSize)

      return { result, total }

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getArticleById(uid:string){
    try {
      return await this.articleModel.findOne({uid})
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async delArticle(ids: string[]){
    try {
      const qb = this.articleModel.createQueryBuilder('article')
      const result = await qb.where("id in (:id)", { id: ids.toString() })
        .execute();
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }

}
