import { EntityModel } from '@midwayjs/orm';
import { Column, OneToOne, JoinColumn, OneToMany, ManyToOne ,PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { User } from './user'
import { Tag } from './tag'
import { Category } from './category'

@EntityModel()
export class Article {
	@PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({length:100})
  title: string;

  @Column({length: 200})
  desc: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ comment: '-1:删除｜0:草稿箱｜1:已发布' })
  status: number;

  @Column()
  visit: number;

  @Column()
  like: number;

  @OneToOne(type => User)
  @JoinColumn({name:'author_uid'})
  author: User;

  @OneToMany(type => Tag, tag => tag.articles)
  tags: Tag[];

  @ManyToOne(type => Category, category => category.articles)
  @JoinColumn({name:'category_uid'})
  category: Category;

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
