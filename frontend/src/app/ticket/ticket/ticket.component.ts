import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ITicketPageResponse } from '../../models/responses/ticket-page-res';
import { ITicket } from '../../models/ticket';
import { IComment } from '../../models/users/Comment';
import { IDecodedToken } from '../../models/users/DecodedToken';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  private ticketId: number;
  private ticketInfo: ITicket;
  private projectUsers: string[];
  private comments: IComment[];
  private user: IDecodedToken;
  private comment: string = '';
  private touched: boolean = false;

  private reassignForm: FormGroup;

  constructor(
    private auth: AuthService,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);
    this.ticketId = this.activatedRoute.snapshot.params.ticketId;

    this.ticketService.getTicketInfo(this.ticketId).subscribe(
      (res: ITicketPageResponse) => {
        this.ticketInfo = res.ticket;
        this.comments = res.comments;
        this.projectUsers = res.users;
      });

    this.reassignForm = this.formBuilder.group({
      userToReassign: ['', Validators.required],
    });

  }

  public update(status: string): void {
    this.ticketService.changeTicketStatus(this.ticketId, status).subscribe(
      (err) => {
        this.ngOnInit();
      });
  }

  public reassign(form: NgForm): void {
    this.ticketService.reassign(this.ticketId, form.value.userToReassign).subscribe(
      (res) => {
        this.ngOnInit();
      },
    );

  }
}
