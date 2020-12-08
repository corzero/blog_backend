import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Article } from './article'


@EntityModel()
export class Category {

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({length:50})
  title: string;

  @Column({length:200})
  desc: string;

  @OneToMany(type => Article, articles => articles.category)
  articles: Article[];

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
