export interface NewArticle {
  title: string;
  desc: string;
  content: string;
  status: number;
  visit: number;
  like: number;
  author: string;
  tag: string[];
}

export interface ModifyArticle extends NewArticle {
  uid: string,
}

export interface FilterArticle {
  title?: string;
  tag?: string[];
  author?: string;
  create_time?: Date;
  update_time?: Date;
  pageNo: number,
  pageSize: number
}
