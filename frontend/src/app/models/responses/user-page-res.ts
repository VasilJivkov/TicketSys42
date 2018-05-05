import { ITicket } from '../ticket';
import { IProject } from '../users/project';
import { IUserInfo } from '../users/user-info';

export interface IUserPageResponse {
    userInfo: IUserInfo;
    issuedTickets: ITicket[];
    receivedTickets: ITicket[];
    userProjects: IProject[];
}
