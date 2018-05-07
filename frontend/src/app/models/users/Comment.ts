export interface IComment {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  UserId: number;
  TicketId: number;
}
