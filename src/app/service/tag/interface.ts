export interface NewTag {
  title: string,
  desc: string,
  type: number,
}

export interface ModifyTag extends NewTag {
  uid: string,
}

export interface FilterTag {
  title?: string;
  type?: number;
  create_time?: Date;
  update_time?: Date;
  pageNo: number,
  pageSize: number
}
