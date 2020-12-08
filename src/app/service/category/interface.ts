export interface NewCategory {
  title: string,
  desc: string,
}

export interface ModifyCategory extends NewCategory {
  uid: string,
}

export interface FilterCategory {
  title?: string;
  create_time?: Date;
  update_time?: Date;
  pageNo: number,
  pageSize: number
}
