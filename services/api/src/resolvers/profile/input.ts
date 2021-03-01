import { ArgsType, Field, InputType } from "type-graphql";
import { ProfileEntity } from "@/database/entities/profile";
import { SharedSelectInput, Sort } from "@/resolvers/bin/inputs/input";

@InputType()
export class WhereProfile {
  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class OrderProfile {
  @Field(() => Sort, { nullable: true })
  name?: Sort;

  @Field(() => Sort, { nullable: true })
  id?: Sort;
}

@ArgsType()
export class InsertProfile implements Partial<ProfileEntity> {
  @Field() id: number;

  @Field() age: number;

  @Field() gender: string;

  @Field() photo: string;
}

@ArgsType()
export class Select extends SharedSelectInput {
  @Field(() => WhereProfile, { nullable: true })
  where?: WhereProfile;

  @Field(() => OrderProfile, { nullable: true })
  order?: OrderProfile;
}
