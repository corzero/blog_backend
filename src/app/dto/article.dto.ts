import { Rule, RuleType } from "@midwayjs/decorator";

export class CreateArticleDTO {

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string())
  desc: string;

  @Rule(RuleType.number())
  content: string;

  @Rule(RuleType.number().default(0))
  status: number;

  @Rule(RuleType.number().default(0))
  visit: number;

  @Rule(RuleType.number().default(0))
  like: number;

  @Rule(RuleType.string().required())
  author: string;

  @Rule(RuleType.array())
  tag: string[];
}

export class ModifyArticleDTO extends CreateArticleDTO{
  @Rule(RuleType.string().required())
  uid: string;
}

export class FilterArticleDTO {
  @Rule(RuleType.string())
  title: string;

  @Rule(RuleType.string())
  tag: string[];

  @Rule(RuleType.string())
  author: string;

  @Rule(RuleType.date())
  create_time: Date;

  @Rule(RuleType.date())
  update_time: Date;

  @Rule(RuleType.number())
  pageNo: number;

  @Rule(RuleType.number())
  pageSize: number
}
