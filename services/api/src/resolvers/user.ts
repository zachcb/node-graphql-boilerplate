import { ArgsType, Field, InputType } from "type-graphql";
import { User } from "@/database/entities/user";
import { SharedSelectInput, SortOrder } from "./shared/Input";

@InputType()
export class WhereUser implements Partial<User> {
  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class OrderUser {
  @Field(() => SortOrder, { nullable: true })
  name?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  id?: SortOrder;
}
@ArgsType()
export class InsertUser implements Partial<User> {
  @Field() name: string;
}

@ArgsType()
export class SelectUser extends SharedSelectInput {
  @Field(() => WhereUser, { nullable: true })
  where?: WhereUser;

  @Field(() => OrderUser, { nullable: true })
  order?: OrderUser;
}
