export interface ITicket {
    title: string;

    description: string;

    deadline: Date;

    priority: number;

    status: string;

    ProjectId: number;

    assigneeId: number;

    requesterId: number;
}
