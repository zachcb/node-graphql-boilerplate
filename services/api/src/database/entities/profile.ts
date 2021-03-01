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
    @PrimaryGeneratedColumn("increment", { name: "Id" })
    id: number;

    @Field(() => ID)
    @Index({ unique: true })
    @Column()
    userId: number;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    photo: string;

    @Field()
    @CreateDateColumn({ name: "CreatedAt" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "UpdatedAt" })
    updatedAt: Date;
}
