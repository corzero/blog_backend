import { Context } from 'egg';
import { Controller, Get, Inject, Provide, Post, Del, Body, ALL, Param } from '@midwayjs/decorator';
import { CategoryService } from '../service/category'
import { FilterCategoryDTO,ModifyCategoryDTO,CreateCategoryDTO } from '../dto/category.dto'
import { AIP_PREFIX } from '../../config/config.default'

@Provide()
@Controller(`${AIP_PREFIX}/category`)
export class CategoryController {

  @Inject()
  ctx: Context

  @Inject()
  categoryService: CategoryService

  @Get('/:uid')
  async getOneCategory(@Param() uid: string) {
    try {
      const result =  await this.categoryService.getCategoryById(uid)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Get('/list')
  async getCategoryList(@Body(ALL) filter: FilterCategoryDTO) {
    try {
      const result = await this.categoryService.searchList(filter)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Post('/create')
  async createCategory(@Body(ALL) params: CreateCategoryDTO) {
    try {
      const result = await this.categoryService.createCategory(params)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Post('/modify')
  async modifyCategory(@Body(ALL) params: ModifyCategoryDTO) {
    try {
      const result = await this.categoryService.modifyCategory(params)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }

  @Del('/del')
  async delCategory(@Body(ALL) params: {ids: string[]}) {
    try {
      const result = await this.categoryService.delCategories(params.ids)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes(500, error.message)
    }
  }
}
