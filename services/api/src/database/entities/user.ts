import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  OneToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Profile } from "./profile";
import { Post } from "./post";

@ObjectType()
@Entity({ name: "User", schema: "config", orderBy: { id: "DESC" } })
export class User extends BaseEntity {
    @Field(() => ID)
    @Index({ unique: true })
    @PrimaryGeneratedColumn("increment", { name: "Id" })
    id: number;

    @Field()
    @Column({ name: "Name", unique: true, nullable: false })
    name: string;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, (post) => post.userId)
    @JoinColumn()
    post: Post;

    @Field()
    @CreateDateColumn({ name: "CreatedAt" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "UpdatedAt" })
    updatedAt: Date;
}
