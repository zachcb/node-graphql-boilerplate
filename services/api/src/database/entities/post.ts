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
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => ID)
    @Index({ unique: true })
    @Column()
    userId: number

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    content: string;

    @Field()
    @CreateDateColumn({ name: "CreatedAt" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "UpdatedAt" })
    updatedAt: Date;
}
