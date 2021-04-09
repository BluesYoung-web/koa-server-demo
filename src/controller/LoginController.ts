import { myredis } from './../database/conn';
/*
 * @Author: zhangyang
 * @Date: 2021-04-08 11:02:48
 * @LastEditTime: 2021-04-09 16:14:52
 * @Description: 处理登录
 */
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Context } from 'koa';
import { BaseController } from './BaseController';
import svgCaptcha from 'svg-captcha';
import conf from '../../conf';

/**
 * 制作token的函数
 */
 const makeToken = function(){
  const md5 = require('md5');
  const sha1 = require('sha1');
  const key = conf.CONF_TOKEN_KEY;
  return md5(key + sha1(new Date().getTime()));
}

export class LoginController extends BaseController {
  private userRepository = getRepository(User);

  async notApply(ctx: Context) {
    this.respond(ctx, '请使用 post 登录', 'fail');
  }

  async post(ctx: Context) {
    const { uid } = ctx.request.body
    const token = makeToken();
    await myredis.set(uid + '_token', token);
    this.respond(ctx, { token }, 'success');
  }

  async getCaptcha(ctx: Context) {
    const cap = svgCaptcha.create({
      size: 4, // 验证码长度
      width: 160,
      height: 60,
      fontSize: 50,
      ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#eee' // 验证码图片背景颜色
    });
    this.respond(ctx, cap, 'success');
  }

}