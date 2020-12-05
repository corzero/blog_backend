export interface NewCollection {
  user_uid: string,
  article_uid: string,
}

export interface DelCollection {
  ids: string[],
  user_uid: string
}

export interface FilterCollection {
  user_uid: string;
  create_time?: Date;
  update_time?: Date;
  pageNo: number,
  pageSize: number
}
