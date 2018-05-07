import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../core/auth.service';
import { IGetCreateTicketResponse } from '../../models/responses/get-create-ticket-res';
import { IDecodedToken } from '../../models/users/DecodedToken';
import { IProject } from '../../models/users/project';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  private createTicketForm: FormGroup;
  private title: AbstractControl;
  private description: AbstractControl;
  private deadline: AbstractControl;
  private projectId: AbstractControl;
  private assigneeId: AbstractControl;

  private createTicketError: string = null;

  private projects: IProject[];
  private usersByProjects: object[][];
  private index: number = -1;
  private listedUsers: object[];

  private user: IDecodedToken;

  private minLength = 6;
  private maxLength = 30;
  private maxDescriptionLength = 120;

  constructor(
    private formBuilder: FormBuilder,
    private createTicketService: TicketService,
    private auth: AuthService,
    public snackBar: MatSnackBar,
    ) { }

  public ngOnInit(): void {
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);

    this.createTicketService.getProjectsAndUsers(this.user.username)
      .subscribe(
        (res: IGetCreateTicketResponse) => {
        this.projects = res.projects;
        this.usersByProjects = res.usersByProjects;
      },
        (err: HttpErrorResponse) => {
          console.log(err.error);
        });

    this.createTicketForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxDescriptionLength)]],
      deadline: ['', Validators.required],
      projectId: ['', Validators.required],
      assigneeId: ['', Validators.required],
    });

    this.title = this.createTicketForm.get('title');
    this.description = this.createTicketForm.get('description');
    this.deadline = this.createTicketForm.get('deadline');
    this.projectId = this.createTicketForm.get('projectId');
    this.assigneeId = this.createTicketForm.get('assigneeId');
  }

  public onProjectChange(event: any): void {
    const project = this.projects.find((proj) => proj.id === event.value);
    this.index = project.index;
    this.listedUsers = this.usersByProjects[this.index];
  }

  public dateFilter(date: Date): boolean {
    return new Date(date) > new Date();
  }

  public createTicket(createTicketForm: NgForm): void {
    if (createTicketForm.valid) {
      const newTicket = createTicketForm.value;
      newTicket.ProjectId = newTicket.projectId;
      delete newTicket.projectId;

      this.createTicketService.createTicket(newTicket, this.user).subscribe(
        (res) => {
        this.openSnackBar('Ticket created successfully', 'OK');
        this.createTicketForm.reset();
        this.createTicketError = null;
        },
        (err: HttpErrorResponse) => {
          this.createTicketError = err.error.err;
        });
    }
  }

  private validate(inputField: AbstractControl): string {
    if (inputField.hasError('required')) {
      return 'The field is required';
    } else if (inputField.hasError('email')) {
      return 'Please enter a valid e-mail.';
    } else if (inputField.errors) {
      if (inputField.errors.minlength) {
        const requiredLength = inputField.errors.minlength.requiredLength;
        return `This field must have at least ${requiredLength} characters.`;
      } else if (inputField.errors.maxlength) {
        const requiredLength = inputField.errors.maxlength.requiredLength;
        return `This field must have a maximum of ${requiredLength} characters.`;
      }
    }
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
