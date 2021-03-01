import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  Index,
} from "typeorm";

@ObjectType()
@Entity({
  name: "Post",
  orderBy: { id: "DESC" },
})
export class PostEntity extends BaseEntity {
    @Field(() => ID)
    @Index({ unique: true })
    @PrimaryGeneratedColumn("increment", { name: "id" })
    id: number;

    @Field(() => ID)
    @Index({ unique: true })
    @Column({ name: "userId" })
    userId: number

    @Field()
    @Column({ name: "title" })
    title: string;

    @Field()
    @Column({ name: "description" })
    description: string;

    @Field()
    @Column({ name: "content" })
    content: string;

    @Field()
    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;
}
