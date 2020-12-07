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
        const token = this.jwt.sign({...rest},this.jwtConfig.secret,{expiresIn: '7d'})
        this.ctx.headers['Authorization'] = token
        this.ctx.cookies.set('authorization',token, {maxAge:3600*1000*24*7})
        this.ctx.body = this.ctx.helper.successRes({...rest,token})
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

  @Post('/current')
  async queryCurrent(@Body(ALL) params: { token: string } ) {
    try {
      const { token } = params
      const { iat, exp, ...rest } = await this.jwt.verify(token,this.jwtConfig.secret)
      this.ctx.body = this.ctx.helper.successRes(rest)
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes(400,'获取失败')
    }
  }

  @Post('/notices')
  async userNotice(@Body(ALL) params: { token: string, uid: string } ) {
    try {
      const { token, uid } = params
      const { uid: uuid } = await this.jwt.verify(token,this.jwtConfig.secret)
      console.log(uuid,uid )
      if(uid === uuid){
        this.ctx.body = this.ctx.helper.successRes([{
          id: '000000001',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
          title: '你收到了 14 份新周报',
          datetime: '2017-08-09',
          type: 'notification',
        },
        {
          id: '000000002',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
          title: '你推荐的 曲妮妮 已通过第三轮面试',
          datetime: '2017-08-08',
          type: 'notification',
        },
        {
          id: '000000003',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
          title: '这种模板可以区分多种通知类型',
          datetime: '2017-08-07',
          read: true,
          type: 'notification',
        },
        {
          id: '000000004',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
          title: '左侧图标用于区分不同的类型',
          datetime: '2017-08-07',
          type: 'notification',
        },
        {
          id: '000000005',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
          title: '内容不要超过两行字，超出时自动截断',
          datetime: '2017-08-07',
          type: 'notification',
        },
        {
          id: '000000006',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '曲丽丽 评论了你',
          description: '描述信息描述信息描述信息',
          datetime: '2017-08-07',
          type: 'message',
          clickClose: true,
        },
        {
          id: '000000007',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '朱偏右 回复了你',
          description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
          datetime: '2017-08-07',
          type: 'message',
          clickClose: true,
        },
        {
          id: '000000008',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '标题',
          description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
          datetime: '2017-08-07',
          type: 'message',
          clickClose: true,
        },
        {
          id: '000000009',
          title: '任务名称',
          description: '任务需要在 2017-01-12 20:00 前启动',
          extra: '未开始',
          status: 'todo',
          type: 'event',
        },
        {
          id: '000000010',
          title: '第三方紧急代码变更',
          description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
          extra: '马上到期',
          status: 'urgent',
          type: 'event',
        },
        {
          id: '000000011',
          title: '信息安全考试',
          description: '指派竹尔于 2017-01-09 前完成更新并发布',
          extra: '已耗时 8 天',
          status: 'doing',
          type: 'event',
        },
        {
          id: '000000012',
          title: 'ABCD 版本发布',
          description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
          extra: '进行中',
          status: 'processing',
          type: 'event',
        }])
      } else {
        this.ctx.body = this.ctx.helper.errorRes(400,'获取失败')
      }
    } catch (error) {
      console.log(error)
      this.ctx.body = this.ctx.helper.errorRes(400,'获取失败')
    }
  }
}
