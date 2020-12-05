
import * as bcryptjs from 'bcryptjs';
import { SALT } from '../../config/config.default'

export default {
  /**
   * bcryptjs 加密
   *
   * @param {string} value 需要加密的值
   * @param {number} salt 加密的强度 0 - 12
   *
   * @returns string
   */
  createBcrypt(value: string):string {
    return bcryptjs.hashSync(value, bcryptjs.genSaltSync(SALT));
  },

  /**
   * 比对输入值与已加密值是否一致
   *
   * @param {string} value 输入值
   * @param {string} hash 已加密的 hash 值
   *
   * @returns boolean
   */
  verifyBcrypt(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash);
  },

  /**
   * ctx.reponse 参数
   *
   * @param {number}} code 输入值
   * @param {string} msg 消息
   * @param {object} result 消息
   *
   * @returns object
   */

  successRes(result:object = null, msg:string='success'):object{
    return {
      code: 200,
      msg,
      result
    }
  },

  errorRes(code:number = 400, msg:string = 'error',result:object = null):object{
    return {
      code,
      msg,
      result
    }
  }
}
