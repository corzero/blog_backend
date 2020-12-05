import { Rule, RuleType } from "@midwayjs/decorator";

export class CreateUserDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;

  @Rule(RuleType.string().required().error(new Error('邮箱必填')).email().error(new Error('邮箱格式错误')))
  email: string;

  @Rule(RuleType.string().max(200).default('😯'))
  desc: string;

  @Rule(RuleType.array().default('user'))
  role: string;

  @Rule(RuleType.string().default(''))
  address: string;

  @Rule(RuleType.array().default([]))
  tag: string[];
}

export class UpdateUserDTO extends CreateUserDTO{
  @Rule(RuleType.string().required())
  uid: string;
}

export class LoginDTO{
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;

}

export class FilterUserDTO {
  @Rule(RuleType.string())
  username: string;

  @Rule(RuleType.string())
  email: string;

  @Rule(RuleType.date())
  create_time: Date;

  @Rule(RuleType.date())
  update_time: Date;

  @Rule(RuleType.number().required())
  pageNo: number;

  @Rule(RuleType.number().required())
  pageSize: number;
}
