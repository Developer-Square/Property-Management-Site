export enum Roles {
  AGENT = 'agent',
  ADMIN = 'admin'
}

export type RolesMap = {
  [key in Roles]: string[];
};

const allRoles: RolesMap = {
  agent: [],
  admin: ['getUsers', 'manageUsers', 'manageProperties'],
};

export const roles = Object.values(Roles);
export const roleRights = new Map(Object.entries(allRoles));
