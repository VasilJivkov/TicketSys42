import { IProject } from '../users/project';
import { IUserInfo } from '../users/user-info';

export interface IProjectPageResponse {
    projectUsers: IUserInfo[];
    projectInfo: IProject;
    companyUsers: IUserInfo[];
}
