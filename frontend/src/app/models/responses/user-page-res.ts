import { UserInfo } from "../users/user-info";
import { Ticket } from "../ticket";
import { Project } from "../users/project";

export interface UserPageResponse {
    userInfo: UserInfo;
    issuedTickets: Ticket[];
    receivedTickets: Ticket[];
    userProjects: Project[];
}
