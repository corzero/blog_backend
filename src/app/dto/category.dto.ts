import { Rule, RuleType } from "@midwayjs/decorator";

export class CreateCategoryDTO {

  @Rule(RuleType.string().required())
  title: string;

}

export class ModifyCategoryDTO extends CreateCategoryDTO{

  @Rule(RuleType.string().required())
  uid: string;

}
export class FilterCategoryDTO {
  @Rule(RuleType.string())
  title: string;

  @Rule(RuleType.date())
  create_time?: Date;

  @Rule(RuleType.date())
  update_time?: Date;

  @Rule(RuleType.number().required())
  pageNo: number;

  @Rule(RuleType.number().required())
  pageSize: number;
}
