export interface INotification {
    title: string;

    read: boolean;

    deleted: boolean;

    url: string;

    createdAt: Date;

    updatedAt: Date;

    ProjectId: number;
}
