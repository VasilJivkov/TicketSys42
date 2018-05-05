import { UserInfo } from "../users/user-info";
import { Ticket } from "../ticket";
import { Project } from "../users/project";

export interface GetCreateTicketResponse {
    projects: Project[];
    usersByProjects: string[][];
}
