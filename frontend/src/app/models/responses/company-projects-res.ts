import { IUserInfo } from '../users/user-info';

export interface ICompanyProjects {
  id: number;
  title: string;
  deadline: Date;
  description: string;
  ownerId: number;
  CompanyId: number;
  users: IUserInfo[];
  partOfProject?: boolean;
}
