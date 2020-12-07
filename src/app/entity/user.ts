import { EntityModel, } from '@midwayjs/orm';
import { Column, OneToMany,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Tag } from './tag'

@EntityModel()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({length:100})
  username: string;

  @Column({})
  password: string;

  @Column()
  email: string;

  @Column({length:100})
  desc: string;

  @Column()
  address: string;

  @Column({comment:'admin|guest|user'})
  role: string;

  @Column({comment:'头像'})
  avatar: string;

  @OneToMany(type => Tag, tag => tag.users)
  tags: Tag[];

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
