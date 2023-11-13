import { BaseEntity } from "./BaseEntity";

export type Group = BaseEntity & {
  name: string;
  user_id: number;
};
