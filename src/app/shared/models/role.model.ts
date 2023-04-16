export interface OLMUserRolePermissions {
  //books
  addBooks: boolean;
  removeBooks: boolean;
  editBooks: boolean;
  borrowBooks: boolean;
  returnBooks: boolean;
  approveBookRequests: boolean;
  manageLibraryInventory: boolean;

  //users
  addUsers: boolean;
  removeUser: boolean;
  editUser: boolean;
  viewUserRecords: boolean;
  manageUserRoles: boolean;
  manageUserAccounts: boolean;

  //general
  manageLibrarySettings: boolean;
  generateReports: boolean;
  owner: boolean;
}

export interface OLMUserRoleModel {
  id: string;
  roleTitle: string;
  permissions: OLMUserRolePermissions;
}
