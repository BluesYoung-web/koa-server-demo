/*
 * @Author: zhangyang
 * @Date: 2021-04-08 10:12:17
 * @LastEditTime: 2021-04-09 10:48:07
 * @Description: 用户实体(表)
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column('char')
  tel: string;
  
  @Column()
  nick: string;

  @Column()
  motto: string;

  @Column()
  avatar: string;

  @Column()
  wxid: string;
}