import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl, NgForm } from '@angular/forms';
import { CreateTicketService } from './create-ticket.service';
import { AuthService } from '../core/auth.service';
import { DecodedToken } from '../models/users/DecodedToken';
import { MatDatepickerInputEvent } from '@angular/material';
import { GetCreateTicketResponse } from '../models/responses/get-create-ticket-res';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../models/users/project';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  private createTicketForm: FormGroup;
  private title: AbstractControl;
  private description: AbstractControl;
  private deadline: AbstractControl;
  private ProjectId: AbstractControl;
  private assigneeId: AbstractControl;

  private createTicketError: string = null;
  

  private projects: Project[];
  private usersByProjects: Object[][];
  private index: number = -1;
  private listedUsers: Object[];
  private user: DecodedToken;

  constructor(private formBuilder: FormBuilder,
    private createTicketService: CreateTicketService,
    private auth: AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe((user: DecodedToken) => this.user = user);
    
    this.createTicketService.getProjectsAndUsers(this.user.username)
      .subscribe((res: GetCreateTicketResponse) => {
        this.projects = res.projects;
        this.usersByProjects = res.usersByProjects;
      }, (err: HttpErrorResponse) => {
        console.log(err.error);
      });

    this.createTicketForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      deadline: ['', Validators.required],
      ProjectId: ['', Validators.required],
      assigneeId: ['', Validators.required],
    });

    this.title = this.createTicketForm.get('title');
    this.description = this.createTicketForm.get('description');
    this.deadline = this.createTicketForm.get('deadline');
    this.ProjectId = this.createTicketForm.get('ProjectId');
    this.assigneeId = this.createTicketForm.get('assigneeId');
  }

  onProjectChange(event) {
    const project = this.projects.find((project) => project.id === event.value);
    this.index = project.index;
    this.listedUsers = this.usersByProjects[this.index];
  }

  createTicket(createTicketForm: NgForm): void {
    if (createTicketForm.valid) {
      const newTicket = createTicketForm.value;
      this.createTicketService.createTicket(newTicket, this.user).subscribe((res) => {
        console.log('successful');
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

  dateFilter(date: Date): boolean {
    return new Date(date) > new Date();
  }

}
