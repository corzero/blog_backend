export interface NewUser {
  username: string,
  password: string,
  email: string,
  desc?: string,
  address?: string,
  tag?: string[]
}

export interface ModifyUser extends NewUser {
  uid: string,
}

export interface FilterUser {
  username?: string;
  email?: string;
  create_time?: Date;
  update_time?: Date;
  pageNo: number,
  pageSize: number
}
