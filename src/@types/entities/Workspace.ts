import { BaseEntity } from "./BaseEntity";

export type Workspace = BaseEntity & {
  avatar: string,
  name: string,
  user_id: number
};
