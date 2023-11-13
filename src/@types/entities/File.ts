import { BaseEntity } from "./BaseEntity";

export type File = BaseEntity & {
  name: string,
  document_id: string;
  isDeleted?: boolean,
  folder_id: number | null,
  spacework_id?: number,
  type: string,
  size?: string,
};
