import { BaseEntity } from "./BaseEntity";

export type Folder = BaseEntity & {
  name: string,
  isDeleted?: boolean,
  parent_id?: number,
  spacework_id?: number,
  size?: string
};
