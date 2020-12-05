import { Rule, RuleType } from "@midwayjs/decorator";

export class CreateCollectionDTO {

  @Rule(RuleType.string().required())
  user_uid: string;

  @Rule(RuleType.string().required())
  article_uid: string;

}

export class DelCollectionDTO {

  @Rule(RuleType.string().required())
  user_uid: string;

  @Rule(RuleType.array().required())
  ids: string[];

}

export class FilterCollectionDTO {
  @Rule(RuleType.string().required())
  user_uid: string;

  @Rule(RuleType.date())
  create_time?: Date;

  @Rule(RuleType.date())
  update_time?: Date;

  @Rule(RuleType.number().required())
  pageNo: number;

  @Rule(RuleType.number().required())
  pageSize: number;
}
