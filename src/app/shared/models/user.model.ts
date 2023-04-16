import { OLMUserRoleModel } from './role.model';

export interface OLMUserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  username: string;
  password: string;
  barcode: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isActive: boolean;
  role: OLMUserRoleModel;
}
