import { EntityModel } from '@midwayjs/orm';
import { OneToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Article } from './article'
import { User } from './user'

@EntityModel()
export class Collection {

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @OneToOne(type => User)
  @JoinColumn({ name:'user_uid' })
  user: User;

  @OneToOne(type => Article)
  @JoinColumn({ name:'article_uid' })
  article: Article;

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
