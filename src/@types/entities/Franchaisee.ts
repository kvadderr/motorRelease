import { BaseUser } from './BaseUser';

export type Franchisee = BaseUser & {
  FIO?: string;
  post?: string;
  franchisor_id: number;
};
