import { UserInfo } from "../users/user-info";
import { Ticket } from "../ticket";

export interface UserPageResponse {
    userInfo: UserInfo;
    issuedTickets: Ticket[];
    receivedTickets: Ticket[];
}
