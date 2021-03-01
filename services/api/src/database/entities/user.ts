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
  BeforeUpdate,
} from "typeorm";
import { ProfileEntity } from "./profile";
import { PostEntity } from "./post";

@ObjectType()
@Entity({
  name: "User",
  orderBy: { id: "DESC" },
})
export class UserEntity extends BaseEntity {
    @Field(() => ID)
    @Index({ unique: true })
    @PrimaryGeneratedColumn("increment", { name: "Id" })
    id: number;

    @Field()
    @Column({ name: "Name", unique: true, nullable: false })
    name: string;

    @OneToOne(() => ProfileEntity)
    @JoinColumn()
    profile: ProfileEntity;

    @OneToMany(() => PostEntity, (post) => post.userId)
    @JoinColumn()
    post: PostEntity;

    @Field()
    @CreateDateColumn({ name: "CreatedAt" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "UpdatedAt" })
    updatedAt: Date;

    @BeforeUpdate()
    updateDates() {
      this.updatedAt = new Date();
    }
}
