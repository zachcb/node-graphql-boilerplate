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
  name: "Profile",
  orderBy: { id: "DESC" },
})
export class ProfileEntity extends BaseEntity {
    @Field(() => ID)
    @Index({ unique: true })
    @PrimaryGeneratedColumn("increment", { name: "id" })
    id: number;

    @Field()
    @Column({ name: "age" })
    age: number;

    @Field()
    @Column({ name: "gender" })
    gender: string;

    @Field()
    @Column({ name: "photo" })
    photo: string;

    @Field()
    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;
}
