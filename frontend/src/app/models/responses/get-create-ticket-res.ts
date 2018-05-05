import { IProject } from '../users/project';

export interface IGetCreateTicketResponse {
    projects: IProject[];
    usersByProjects: object[][];
}
