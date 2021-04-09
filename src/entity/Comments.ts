/*
 * @Author: zhangyang
 * @Date: 2021-04-09 17:53:24
 * @LastEditTime: 2021-04-09 18:05:17
 * @Description: 评论表
 */
import { Entity, Column, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Circle } from './Circles';
import { User } from './User';


@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  autoid: number;

  @Column()
  content: string;

  @ManyToOne(() => Circle, circle => circle.like_ids)
  circle_id: Circle;

  @OneToOne(() => User)
  @JoinColumn()
  user_id: User;
}