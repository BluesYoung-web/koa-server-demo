/*
 * @Author: zhangyang
 * @Date: 2021-04-09 17:53:03
 * @LastEditTime: 2021-04-09 18:05:27
 * @Description: 点赞表
 */
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Circle } from './Circles';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  autoid: number;

  @Column()
  is_like: 0 | 1;

  @ManyToOne(() => Circle, circle => circle.like_ids)
  circle_id: Circle;
}