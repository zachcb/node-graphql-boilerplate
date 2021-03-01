import { ArgsType, Field, InputType } from "type-graphql";
import { SharedSelectInput, Sort } from "./input";

@InputType()
export class Where {
  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class Order {
  @Field(() => Sort, { nullable: true })
  name?: Sort;

  @Field(() => Sort, { nullable: true })
  id?: Sort;
}
@ArgsType()
export class Insert {
  @Field() name: string;
}

@ArgsType()
export class Select extends SharedSelectInput {
  @Field(() => Where, { nullable: true })
  where?: Where;

  @Field(() => Order, { nullable: true })
  order?: Order;
}
