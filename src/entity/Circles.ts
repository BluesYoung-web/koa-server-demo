/*
 * @Author: zhangyang
 * @Date: 2021-04-09 17:39:41
 * @LastEditTime: 2021-04-09 18:06:18
 * @Description: 朋友圈表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import { Likes } from "./Likes";
import { Comments } from './Comments';
import { User } from "./User";

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => User, user => user.circles)
  user_id: User;

  @CreateDateColumn()
  time: string;

  @Column('simple-json')
  imgs: string;

  @Column()
  comments_num: number;

  @OneToMany(() => Likes, like => like.circle_id)
  like_ids: Likes[];

  @OneToMany(() => Comments, com => com.circle_id)
  comment_ids: Comments[];
}