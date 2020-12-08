import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Article } from './article'
import { User } from './user'

@EntityModel()
export class Tag {

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({length:50})
  title: string;

  @Column({length:200})
  desc: string;

  @Column({
    comment:'0:user, 1:article',
    default: 1
  })
  type: number;

  //对应User实体中的@OneToMany修饰的字段（不可以单独存在）
  @ManyToOne(type => Article, articles => articles.tags)
  //指定本表中的外键（JoinColumn只存在于多端，因为外键只会存在于多端）
  @JoinColumn()
  articles: Article;

  //对应User实体中的@OneToMany修饰的字段（不可以单独存在）
  @ManyToOne(type => User, user => user.tags)
  //指定本表中的外键（JoinColumn只存在于多端，因为外键只会存在于多端）
  @JoinColumn()
  users: User;

  @CreateDateColumn({
    type: "timestamp",
		nullable: false,
		name: "created_at",
		comment: "创建时间",
  })
  created_at: Date

  @UpdateDateColumn({
    type: "timestamp",
		nullable: false,
		name: "update_at",
		comment: "更新时间",
  })
  update_at: Date

}
