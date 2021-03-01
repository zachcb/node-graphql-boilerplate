import { ArgsType, Field, InputType } from "type-graphql";
import { UserEntity } from "@/database/entities/user";
import { SharedSelectInput, Sort } from "@/resolvers/bin/inputs/input";
import { ProfileEntity } from "@/database/entities/profile";

@InputType()
export class WhereUser {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  profileId?: number;
}

@InputType()
export class OrderUser {
  @Field(() => Sort, { nullable: true })
  name?: Sort;

  @Field(() => Sort, { nullable: true })
  id?: Sort;
}

@ArgsType()
export class InsertUser implements Partial<UserEntity> {
  @Field() name: string;
}

@ArgsType()
export class SelectUser extends SharedSelectInput {
  @Field(() => WhereUser, { nullable: true })
  where?: WhereUser;

  @Field(() => OrderUser, { nullable: true })
  order?: OrderUser;
}
