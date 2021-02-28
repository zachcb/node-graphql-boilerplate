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
  name: "Profile",
  orderBy: { id: "DESC" },
})
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    age: string;

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
