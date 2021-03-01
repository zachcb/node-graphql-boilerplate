import { ArgsType, Field, InputType } from "type-graphql";
import { PostEntity } from "@/database/entities/post";
import { SharedSelectInput, Sort } from "@/resolvers/bin/inputs/input";

@InputType()
export class WherePost {
  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class OrderPost {
  @Field(() => Sort, { nullable: true })
  name?: Sort;

  @Field(() => Sort, { nullable: true })
  id?: Sort;
}

@ArgsType()
export class InsertPost implements Partial<PostEntity> {
  @Field() userId: number;

  @Field() title: string;

  @Field() description: string;

  @Field() content: string;
}

@ArgsType()
export class SelectPost extends SharedSelectInput {
  @Field(() => WherePost, { nullable: true })
  where?: WherePost;

  @Field(() => OrderPost, { nullable: true })
  order?: OrderPost;
}
