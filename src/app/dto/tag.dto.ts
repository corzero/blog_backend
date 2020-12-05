import { Rule, RuleType } from "@midwayjs/decorator";

export class CreateTagDTO {

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.number().required())
  type: number;

}

export class ModifyTagDTO extends CreateTagDTO{

  @Rule(RuleType.string().required())
  uid: string;

}
export class FilterTagDTO {
  @Rule(RuleType.string())
  title: string;

  @Rule(RuleType.number())
  type: number;

  @Rule(RuleType.date())
  create_time?: Date;

  @Rule(RuleType.date())
  update_time?: Date;

  @Rule(RuleType.number().required())
  pageNo: number;

  @Rule(RuleType.number().required())
  pageSize: number;
}
