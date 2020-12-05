import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../../entity/user';
import { Repository } from 'typeorm';
import { ModifyUser, NewUser, FilterUser } from './interface'

@Provide()
export class UserService {

  @InjectEntityModel(User)
	userModel: Repository<User>;

  async createUser(params:NewUser){
    try {
      let user = new User();
      Object.assign(user,params)
      const result = await this.userModel.save(user);
      return result
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async modifyUser(params: ModifyUser){
    try {
      let user = new User();
      const { uid, ...rest } = Object.assign(user,params)
      return await this.userModel.update(rest,{uid});
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async searchList(filter: FilterUser){
    try {
      const { email, username } = filter

      const qb = this.userModel
        .createQueryBuilder('user')
      const total = qb.where('username = :username',{username:`%${username}%`})
        .orWhere('email = :email',{email:`%${email}%`})
        .getCount()

      const result = qb.where('username = :username',{username:`%${username}%`})
        .orWhere('email = :email',{email:`%${email}%`})
        .skip(filter.pageSize * (filter.pageNo - 1))
        .take(filter.pageSize)

      return {result,total}

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getUserById(uid:string){
    try {
      const result = await this.userModel.findOne({uid});
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async findUserByNameOrEmail(userOrEmail:string){
    try {
      const result = await this.userModel
        .createQueryBuilder('user')
        .where('username = :userOrEmail')
        .orWhere('email = :userOrEmail')
        .setParameters({ userOrEmail })
        .getOne();
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
