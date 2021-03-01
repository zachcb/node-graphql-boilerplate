import { IsNumber } from "class-validator";
import { ArgsType, Field, registerEnumType } from "type-graphql";

export enum Sort {
  ASC = "ASC",
  DESC = "DESC"
}

registerEnumType(Sort, { name: "Sort" });

@ArgsType()
export class SharedSelectInput {
  @IsNumber()
  @Field({ nullable: true })
  take: number;

  @IsNumber()
  @Field({ nullable: true })
  skip: number;
}
