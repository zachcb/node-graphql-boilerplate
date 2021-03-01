import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

@ObjectType()
@Entity({
  name: "Post",
  orderBy: { id: "DESC" },
})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    photo: string;

    @Column()
    content: string;

    @Column()
    userId: number;

    @Field()
    @CreateDateColumn({ name: "CreatedAt" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "UpdatedAt" })
    updatedAt: Date;
}
