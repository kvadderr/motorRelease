import { ROLE } from "../@types/entities/Role";

export const allowedRolesAdmin = [ROLE.ADMIN, ROLE.MANAGER, ROLE.ROOT];
export const allowedRolesFranchaisor = [ROLE.ADMIN, ROLE.MANAGER, ROLE.ROOT, ROLE.FRANCHISOR];
export const allowedRolesFranchaisee = [ROLE.ADMIN, ROLE.MANAGER, ROLE.ROOT, ROLE.FRANCHISEE];