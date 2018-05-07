import { ITicket } from '../ticket';
import { IComment } from '../users/Comment';

export interface ITicketPageResponse {
  ticket: ITicket;
  comments: IComment[] | null;
  users: string[];
}
