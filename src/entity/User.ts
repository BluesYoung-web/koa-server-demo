/*
 * @Author: zhangyang
 * @Date: 2021-04-08 10:12:17
 * @LastEditTime: 2021-04-09 17:44:03
 * @Description: 用户实体(表)
 */
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Circle } from './Circles';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  tel: string;
  
  @Column()
  nick: string;

  @Column()
  motto: string;

  @Column()
  avatar: string;

  @Column()
  wxid: string;

  @ManyToMany(() => User)
  @JoinTable()
  f_id: User[];

  @OneToMany(() => Circle, circle => circle.user_id)
  circles: Circle[];
}