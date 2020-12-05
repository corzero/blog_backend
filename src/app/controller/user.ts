import { Context } from 'egg';
import { Controller, Get, Post ,Provide, Validate, Body, ALL, Param, Inject,Plugin, Config } from '@midwayjs/decorator';
import { CreateUserDTO, UpdateUserDTO, LoginDTO, FilterUserDTO } from '../dto/user.dto'
import {UserService} from '../service/user'
import { AIP_PREFIX } from '../../config/config.default'


@Provide()
@Controller(`${AIP_PREFIX}/user`)
export class UserController {

  @Inject()
  ctx:Context

  @Inject()
  private readonly userService: UserService

  @Plugin()
  jwt;

  @Config('jwt')
  jwtConfig;

  @Post('/login')
  @Validate()
  async login (@Body(ALL) params: LoginDTO ) {
    try {
      const result = await this.userService.findUserByNameOrEmail(params.username)

      const { password = '', ...rest } = result
      const isValidate = this.ctx.helper.verifyBcrypt(params.password, password)

      if(result && isValidate){
        const token = this.jwt.sign(rest,this.jwtConfig.secret,{expiresIn: '7d'})
        this.ctx.headers['Authorization'] = token
        this.ctx.cookies.set('authorization',token, {maxAge:3600*1000*24*7})
        this.ctx.body = this.ctx.helper.successRes(rest)
      } else if(result && !isValidate) {
        this.ctx.body = this.ctx.helper.errorRes(400,'账号或密码不正确')
      } else {
        this.ctx.body = this.ctx.helper.errorRes(400,'账号或密码不存在')
      }
    } catch (error) {
      console.error(error)
      this.ctx.body = this.ctx.helper.errorRes(400,'error')
    }
  }

  @Post('/update')
  @Validate()
  async modifyUser (@Body(ALL) user: UpdateUserDTO ) {
    try {
      const result = await this.userService.modifyUser(user)
      if(result){
        this.ctx.body = this.ctx.helper.successRes()
      } else {
        this.ctx.body = this.ctx.helper.errorRes('更新失败，请检查信息内容')
      }
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes('更新失败')
    }
  }

  @Validate()
  @Post('/register')
  async register(@Body(ALL) user: CreateUserDTO ): Promise<any> {
    try {
      user.password = this.ctx.helper.createBcrypt(user.password)
      console.log(user.password)
      const result = await this.userService.createUser(user)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      console.log('\n\n\ncatch 错误:',error)
      this.ctx.body = this.ctx.helper.errorRes(500,'inside error')
    }
  }

  @Post('/list')
  @Validate()
  async getAllUser(@Body(ALL) filter: FilterUserDTO ) {
    try {
      const result = await this.userService.searchList(filter)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes(500,'查询失败')
    }
  }


  @Get('/:uid')
  @Validate()
  async getUserById(@Param() uid: string) {
    try {
      const result = await this.userService.getUserById(uid)
      this.ctx.body = this.ctx.helper.successRes(result)
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes(500,'查询失败')
    }
  }
}
