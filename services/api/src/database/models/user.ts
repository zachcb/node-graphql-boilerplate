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
} from "typeorm";
import { Profile } from "./profile";
import { Post } from "./post";

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @Index({ unique: true })
    @PrimaryGeneratedColumn("increment", { name: "Id" })
    id: number;

    @Field()
    @Column()
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
